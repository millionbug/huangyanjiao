import Vue from 'vue';
import Router from 'vue-router';
import routes from './client/router.js';

Vue.use(Router)
console.log(Vue)
let router = new Router({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  template: `
    <div>
      <router-view></router-view>
    </div>
  `
})
