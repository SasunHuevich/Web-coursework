import { createApp } from 'vue' //Импорт метода для создания приложения
import App from './App.vue' //Импорт главного компонента
import router from './router' //Маршрутизация
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'

const app = createApp(App); //Создание экземпляра приложения
app.use(router); //подключение маршрутизации
app.use(store);
app.mount('#app'); //привязка экземпляра приложения к странице HTML (находится в public)
