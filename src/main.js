import Vue from 'vue';
import Router from 'vue-router';
import routes from './client/router.js';

Vue.use(Router)

let router = new Router({
  routes
})
new Vue({
  el: '#app',
  router,
  template: `<div>
    <router-view></router-view>
  </div>`
})










// import _ from 'lodash'
// function component() {
//   var element = document.createElement('div');

//   // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
//   element.innerHTML = _.join(['Hello', 'webpack', '现在关掉inline']);

//   return element;
// }

// document.body.appendChild(component());

