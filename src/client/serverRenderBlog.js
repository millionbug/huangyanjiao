const Vue = require('vue')
const Blog = require('./Blog.vue')
const app = new Vue({
  render: h => h(Blog)
})

module.exports =  app
