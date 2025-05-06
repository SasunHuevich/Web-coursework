<template>
    <div>
      <h5>Студент {{ student.name }}, группа {{ student.student_group_name }}</h5>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation" v-for="course in courses" :key="course.id">
          <button
              class="nav-link"
              :class="{ active: currentCourse === course.id }"
              :id="'course' + course.id + '-tab'"
              data-bs-toggle="tab"
              :data-bs-target="'#course' + course.id"
              type="button"
              role="tab"
              @click="setCurrentCourse(course.id)"
          >
            {{ course.name }}
          </button>
        </li>
      </ul>
  
      <div class="tab-content">
        <div
            v-for="course in courses"
            :key="course.id"
            :class="{ 'tab-pane': true, 'fade': currentCourse !== course.id, 'show': currentCourse === course.id, 'active': currentCourse === course.id }"
            :id="'course' + course.id"
            role="tabpanel"
            :aria-labelledby="'course' + course.id"
        >
          <ul class="nav nav-tabs mt-3" role="tablist">
            <li class="nav-item" role="presentation" v-for="semester in semesters" :key="semester.id" >
              <button
                  class="nav-link"
                  :class="{ 'active': currentSemester === semester.id }"
                  :id="'course' + course.id + '-semester' + semester.id + '-tab'"
                  data-bs-toggle="tab"
                  :data-bs-target="'#course' + course.id + '-semester' + semester.id"
                  type="button"
                  role="tab"
                  @click="setCurrentSemester(semester.id)"
              >
                {{ semester.name }}
              </button>
            </li>
          </ul>
  
          <div class="tab-content">
            <div
                v-for="semester in semesters"
                :key="semester.id"
                :class="{
                  'tab-pane': true ,
                  'fade': currentCourse !== course.id && currentSemester !== semester.id,
                  'show': currentCourse === course.id && currentSemester === semester.id,
                  'active': currentCourse === course.id && currentSemester === semester.id}"
                :id="'course' + course.id + '-semester' + semester.id"
                role="tabpanel"
                :aria-labelledby="'course' + course.id + '-semester' + semester.id"
                @click="setCurrentSemester(semester.id)"
            >
              <SessionTable
                  :attestationBookForSemester="getAttBookForSemester(course.id, semester.id)"
                  :student="student"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SessionTable from "./SessionTable.vue";
  import http from "../../http-common";
  
  export default {
    name: "attestation-book",
    props: ['student_id'],
    components: {
      SessionTable,
    },
    data() {
      return {
        student: {
          id: null,
          name: "",
          student_group_id: null,
          student_group_name: "",
        },
        currentCourse: 1,
        currentSemester: 1,
        courses: [
          { id: 1, name: "Курс 1" },
          { id: 2, name: "Курс 2" },
          { id: 3, name: "Курс 3" },
          { id: 4, name: "Курс 4" },
        ],
        semesters: [
          { id: 1, name: "Осенний семестр" },
          { id: 2, name: "Весенний семестр" },
        ],
        attestationBook: []
      };
    },
    methods: { 
      setCurrentCourse(courseId) {
        this.currentCourse = courseId;
      },
      setCurrentSemester(semesterId) {
        this.currentSemester = semesterId;
      },
      getAttestationBook() {
        http
            .get("/attestationBook/studentId=" + this.student_id)
            .then(response => {
              this.attestationBook = response.data;
            })
            .catch(e => {
              console.log(e);
            });
      },
      getStudent() {
        http
          .get("/student/" + this.student_id)
          .then(response => {
            this.student.id = response.data.id;
            this.student.name = response.data.name;
            this.student.student_group_id = response.data.student_group_id;
            return http.get("/studentGroup/" + this.student.student_group_id);
            })
            .then(groupResponse => {
            this.student.student_group_name = groupResponse.data.name;
            })
          .catch(e => {
            console.log(e)
          });
      },
      getAttBookForSemester(courseId, semesterId) {
        return this.attestationBook[courseId +","+ semesterId];
      },
    },
    mounted() {
      this.getStudent();
      this.getAttestationBook();
    }
  };
  </script>