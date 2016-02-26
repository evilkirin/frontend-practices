window.REM_UNIT = 112.5 // NEED CONFIG IN EACH PROJECT
window.CDN_URL = require('../images/cdnurl.json')

console.log(window.REM_UNIT, window.devicePixelRatio)

addEventListener('DOMContentLoaded', function () {

  // var Vue = require('vue')

  var opt = require('./main.vue')
  var app = new Vue(opt).$mount('#app')

  window.app = app
})
