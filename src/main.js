import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

import 'bootswatch/dist/zephyr/bootstrap.css'
import {pageTitle} from "vue-page-title";

const app = createApp(App)

app.component('bootstrap-icon', BootstrapIcon)
app.use(router)
app.use(pageTitle({router}))

app.mount('#app')
