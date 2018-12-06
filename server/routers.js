let fs = require('fs');
let Router = require('./module/router');
let md = require('markdown-it')()
let serverRender = require('../render/index.js')

let router = new Router;
let routerArr = [{
  url: '/',
  async controller(ctx) {
    let url = '/dist/index.html'
    ctx.render(url)
    return
  }
}, {
  url: '/blog/detail',
  async controller(ctx, next) {
    let {id} = ctx.request.query;
    let mdString = fs.readFileSync(process.cwd() + `/blog/${id}.md`).toString()
    let htmlString = md.render(mdString)
    htmlString = serverRender(htmlString)
    ctx.type = 'html'
    ctx.body = htmlString
    next()
  }
}, {
  url: '/api/blogs/composition',
  async controller(ctx, next) {
    // let dir = fs.readdirSync(process.cwd() + '/blog');
    // let data = dir.map(filename => {
    //   let file = fs.readFileSync(process.cwd() + '/blog/' + filename)
    //   return file.toString().slice(0, 200)
    // })
    let data = [{
      title: '一个web项目的构建vue + koa2 + webpack + node',
      id: 'howtocreatewebapp'
    }]
    ctx.body = {
      code: 200,
      data
    }
  }
}]
routerArr.forEach(r => {
  router.use(r.url, r.controller)
})
module.exports = router.routeMiddle()