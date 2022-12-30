import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootstrap/dist/css/bootstrap.css'
import mdb from 'mdb-ui-kit'
import 'mdb-ui-kit/css/mdb.min.css'
import store from './store/store.js'

const app = createApp(App)

app.use(router)
app.use(mdb)
app.use(store)

app.mount('#app')
