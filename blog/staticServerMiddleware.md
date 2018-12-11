# 静态资源管理中间件

------
我们开启一个端口作为webapp的服务之后，不管是API服务还是静态资源服务都是http请求，这些http请求都会带着req,res对象来到服务器，被我们处理到。就是说，按照我们的项目架构，前端页面中的%<%img   src="/dist/koa.png"/>"并不会获取到dist目录下的koa.png，而是作为一个http请求被我们的截获，而接收到获取dist目录下的图片资源之类的请求后需要我们主动将图片读取出来返还给浏览器。
解决思路是这样的：
> * 1.将静态资源放在特定的目录下
> * 2.检测到请求的是某一类的静态资源，就到对应的目录读取文件并返回
```javascript
let fs = require('fs')

let mime = {
 "css": "text/css",
 "gif": "image/gif",
 "html": "text/html",
 "ico": "image/x-icon",
 "jpeg": "image/jpeg",
 "jpg": "image/jpeg",
 "js": "text/javascript",
 "json": "application/json",
 "pdf": "application/pdf",
 "png": "image/png",
 "txt": "text/plain",
}
let mimeType = Object.keys(mime)

module.exports = function(path, dir) {
  return async (ctx, next) => {
    if (ctx.req.url.indexOf(path) === 0) {//检查这个请求是否是请求静态资源
      console.log(ctx.req.url, path, '🌹')
      let type = mimeType.find(type => ctx.req.url.indexOf('.' + type) > 0) //如果该类型的资源存在
      if (type) {
        let stream = fs.createReadStream(process.cwd() + ctx.req.url)
        ctx.res.setHeader("Content-Type", mime[type])
        stream.on('error', err => console.log(err))
        stream.pipe(ctx.res)
      }
    } else {
      await next() //如果不是对静态资源的请求，就继续走中间件或者路由业务逻辑
    }
  }
}
```

```javascript 
//使用方法
let {Application} = require('./module/app')
let routes = require('./routers.js')
let app = new Application()
let staticServer = require('./staticServer.js')

app.use(staticServer('/dist', '/dist'))
app.use(staticServer('/img', '/img'))
app.use(staticServer('/renderStatic', '/renderStatic'))

app.use(async (ctx, next) => {
  console.log('1 🌹')
  await next()
  console.log('4 🐷')
})

app.use(async (ctx, next) => {
  console.log('2 🌞')
  await next()
  
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3 🌛')
      resolve()
    }, 5000)
  })
})

app.use(routes)


app.listen('3000', _ => console.log('running in localhost:3000'))

```
