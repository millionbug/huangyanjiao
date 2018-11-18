let fs = require('fs');
let Router = require('./module/router');
let md = require('markdown-it')()




let router = new Router;
let routerArr = [{
  url: '/blog', 
  controller(ctx, next) {
    let {id} = ctx.request.query
    // console.log(ctx.req.url, id, process.cwd() + `/blog/${id}.md`, 'request path=========')
    let mdString = fs.readFileSync(process.cwd() + `/blog/${id}.md`).toString()
    ctx.type = 'html'
    ctx.body = md.render(mdString)
    console.log(ctx.body)
    next();
  }
}]
routerArr.forEach(r => {
  router.use(r.url, r.controller)
})
module.exports = router.routeMiddle()