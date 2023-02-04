import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootstrap/dist/css/bootstrap.css'
import mdb from 'mdb-ui-kit'
import 'mdb-ui-kit/css/mdb.min.css'
import store from './store/store.js'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

library.add(fas)
library.add(fab)
library.add(far)
dom.watch()

const app = createApp(App)

app.use(router)
app.use(mdb)
app.use(store)
app.use(vuetify)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
