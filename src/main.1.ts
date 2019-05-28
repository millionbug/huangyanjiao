import Vue from 'vue';
import Router from 'vue-router';
import routes from './client/router.js';
import hljs from 'highlight.js';
import catchError from './study-js/catchError.js';

catchError();

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  template: `
    <router-view></router-view>
  `
})
