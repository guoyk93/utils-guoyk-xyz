import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import 'bootswatch/dist/zephyr/bootstrap.css'
import {pageTitle} from "vue-page-title";
import VueGtag from "vue-gtag";

const app = createApp(App)

app.component('bootstrap-icon', BootstrapIcon)
app.use(ToastPlugin)
app.use(router)
app.use(pageTitle({router}))
app.use(VueGtag, {config: {id: "G-RKZ2XHJGWQ"}}, router);

app.mount('#app')
