let fs = require('fs');
let Router = require('./module/router');
let md = require('markdown-it')()
let serverRender = require('./render/index.js')

let router = new Router;
let routerArr = [{
  url: '/server/render/blog',
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
  url: '/blog', 
  async controller(ctx, next) {
    let {id} = ctx.request.query
    console.log(ctx.req.url, id, process.cwd() + `/blog/${id}.md`, 'request path=========')
    let mdString = fs.readFileSync(process.cwd() + `/blog/${id}.md`).toString()
    ctx.type = 'html'
    console.log(ctx.type, 'ctx.type')
    ctx.body = md.render(mdString)
    next();
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
      title: '博文1',
      date: 1543142472148
    }, {
      title: '博文2',
      date: 1543142472148
    }, {
      title: '博文3',
      date: 1543142472148
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