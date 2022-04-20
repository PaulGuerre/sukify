import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootstrap/dist/css/bootstrap.css'
import mdb from 'mdb-ui-kit'
import 'mdb-ui-kit/css/mdb.min.css'
import PrimeVue from 'primevue/config'

createApp(App).use(router).use(mdb).use(PrimeVue).mount('#app')
