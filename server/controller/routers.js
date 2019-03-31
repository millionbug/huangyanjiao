let fs = require('fs');
let Router = require('../module/router.js');
let md = require('markdown-it')()
let serverRender = require('../../render/index.js')

function checkFileExist(filePath, ctx) {
  if (!fs.existsSync(filePath)) {
    ctx.code = 404;
    throw filePath + '文件不存在';
  }
}

let router = new Router;
let routerArr = [{
  url: [
    '/',
    '/blog',
    '/game',
    '/css',
    '/newblog'
  ],
  async controller(ctx) {
    // let url = '/dist/index.html'
    let url = '/prod/index.html'
    ctx.render(url)
    return
  }
}, {
  url: '/api/blogsdir',
  async controller(ctx, next) {
    let dirObj = [];
    let files = fs.readdirSync(process.cwd() + `/blog`);
    files.forEach(file => {
      let f = fs.readdirSync(process.cwd() + '/blog/' + file);
      dirObj.push({
        category: file,
        list: f
      })
    })
    ctx.type = 'json';
    ctx.body = dirObj;
  }
}, {
  url: '/blog/detail',
  async controller(ctx, next) {
    let {id, category} = ctx.request.query;
    let mdString = fs.readFileSync(process.cwd() + `/blog/${category}/${id}`).toString()
    let htmlString = md.render(mdString)
    htmlString = serverRender(htmlString)
    ctx.type = 'html'
    ctx.body = htmlString
    next()
  }
}, {
  url: '/api/blogs/single',
  async controller(ctx, next) {
    let {id, category} = ctx.request.query;
    let filePath = process.cwd() + `/blog/${category}/${id}`;
    checkFileExist(filePath, ctx);
    let str = fs.readFileSync(filePath).toString()
    ctx.type = 'text'
    ctx.body = str
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
    }, {
      title: 'koa框架源码解析',
      id: 'koa'
    }, {
      title: 'koa-router源码解析',
      id: 'koa-router'
    }, {
      title: '静态资源服务中间件',
      id: 'staticServerMiddleware'
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