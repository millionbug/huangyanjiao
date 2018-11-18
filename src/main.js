import Vue from 'vue';
import App from './client/App.vue';
new Vue({
  el: '#app',
  components: {
    'app': App
  },
  template: `<app />`
})










// import _ from 'lodash'
// function component() {
//   var element = document.createElement('div');

//   // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
//   element.innerHTML = _.join(['Hello', 'webpack', '现在关掉inline']);

//   return element;
// }

// document.body.appendChild(component());

