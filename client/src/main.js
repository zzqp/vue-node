import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './axios'
import './plugins/wyz-echarts/wyz-echarts.js'

Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
