import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootstrap/dist/css/bootstrap.css'

createApp(App).use(router).mount('#app')
