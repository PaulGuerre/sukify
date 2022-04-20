import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootstrap/dist/css/bootstrap.css'
import mdb from 'mdb-ui-kit'
import 'mdb-ui-kit/css/mdb.min.css'

createApp(App).use(router).use(mdb).mount('#app')
