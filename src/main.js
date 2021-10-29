import Vue from 'vue'
import App from './App.vue'
import router from './router'
import bootstrapCss from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Jquery from 'jquery'
window.$ = window.jQuery = Jquery
import popper from 'popper.js'
import bootstrapjs from '../node_modules/bootstrap/dist/js/bootstrap.min.js'
Vue.config.productionTip = false
import axios from 'axios';
window.axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')