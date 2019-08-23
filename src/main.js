/**
 * src/main.js
 * initial setup of the Vue object, store, and attaching to the main app element.
 */

import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {store} from './_store'

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
