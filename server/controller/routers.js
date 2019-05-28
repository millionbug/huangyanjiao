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
    '/newblog',
    '/wsdemowhynot'
  ],
  async controller(ctx, next) {
    // let url = '/dist/index.html'
    let url = '/prod/index.html'
    ctx.render(url)
  }
}, {
  url: '/api/blogsdir',
  async controller(ctx, next) {
    let dirList = [];
    let modifyList = []
    let Path = process.cwd();
    let files = fs.readdirSync(Path + `/blog`);
    files.forEach(file => {
      let f = fs.readdirSync(Path + '/blog/' + file);
      dirList.push({
        category: file,
        list: f.map(fileName => {
          return fileName.slice(-3) === '.md' ? fileName.slice(0, -3) : fileName;
        })
      })

      let stats = f.map(fileName => {
        return {
          fileName: fileName.slice(-3) === '.md' ? fileName.slice(0, -3) : fileName,
          ...fs.statSync(`${Path}/blog/${file}/${fileName}`)
        }
      })

      modifyList = modifyList.concat(stats);

    })
    modifyList.forEach(file => console.log(file.mtime + ','))
    ctx.type = 'json';
    ctx.body = {
      modifyList,
      dirList
    };
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
    let filePath = process.cwd() + `/blog/${category}/${id}.md`;
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
}, {
  url: '/api/redirect/test',
  async controller(ctx, next) {
    console.log('🎩', ctx.req.method)
    ctx.type = 'redirect';
    ctx.redirectUrl = '';
  }
}, {
  url: '/api/cookie/test',
  async controller(ctx, next) {
    console.log(ctx.req.headers, '🍓')
    ctx.body = {
      code: 200,
      data: 'cookie test'
    }
  }
}, {
  url: '/api/fsstate/test',
  async controller(ctx, next) {
    return new Promise(function(resolve, reject) {
      fs.stat(process.cwd() + '/blog/' + 'javascript/koa.md', function(err, state) {
        resolve(state)
      })
    }).then(state => {
      ctx.body = {
        code: 200,
        data: state
      }
    })
    let file = fs.state(process.cwd() + '/blog/' + 'javascript/koa.md')
    ctx.body = {
      code: 200,
      data: file
    }
  }
}]
routerArr.forEach(r => {
  router.use(r.url, r.controller)
})
module.exports = router.routeMiddle()