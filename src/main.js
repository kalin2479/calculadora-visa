import Vue from 'vue'
import App from './App.vue'

import jQuery from 'jquery'
global.jQuery = jQuery
global.$ = jQuery

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import { required, minLength, between } from 'vuelidate/lib/validators'

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)


new Vue({
  el: '#app',
  render: h => h(App)
})
