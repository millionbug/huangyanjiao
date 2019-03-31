# KOA原理

------

koa是一个node后端框架，node就是处理前端浏览器发过来的http请求的。koa是一种代码的组织模式，先看一下koa框架做的事情吧
```javascript
let koa = require('koa');
let app = new koa();

app.use((req, res) => {
    res.writeHead(200);
    res.end('hello world');
});

app.listen(3000, () => {
    console.log('listening on 3000');
});
```
1.生成koa实例
2.app.use注册一个中间件
3.app.listen开启监听某个端口的服务
首先要理解koa做了一件什么事，koa使得你可以更好的组织代码来处理http请求。解析一个http请求，再完成对http请求的响应会有很多事情，koa提供了一中组织代码的方式：
https://segmentfault.com/img/bV6DZG?w=478&h=435
就是每个http请求，都会两次通过一个中间件。这样中间件可以完成更多都操作，但是简单来看koa的中间件可以作为一个数组，每个http请求从第一个中间件开始，一直经过数组中的每个中间件处理比如对该请求鉴权，解析参数，打日志。不过为了支持更多的功能我们还是可以将koa按照官网的设计来实现。理解了koa的原理（不讲了，这个主要是写给我自己看的）之后我们再来看看如何实现它，主要就是将middleware数组实现为一个符合洋葱模型的执行顺序的函数
```javascript
function compose(middlewares) {
    return ctx => {
        let next = new Promise((resolve, reject) => resolve())
        function createNext(mddleware, next) {
            return async function() {
                return middlewares[len -1](ctx, next)
            }
            return middleware(ctx, next)
        }
        for (let len = middlewares.length; len >= 0; len--) {
            next = createnext(middlewares[len -1], next)
        }
        await next()
    }
}
```
生成response对象
```javascript
let response = {
  get body () {
    return this._body
  },
  /**
   * 设置返回给客户端的body
   */
  set body (data) {
    this._body = data // 这里没有调用this.res.end方法来直接返回数据，是因为可能会多次复写body，所以真正的操作会在applicatioin中
  },
  get status () {
    return this.res.statusCode
  },
  /**
   * 设置返回给客户端的status
   */
  set status (code) {
    this.res.statusCode = code
  }
}
module.exports = response

```

创建request对象
```javascript
let url = require('url')
let request = {
  get query () {
    return url.parse(this.req.url, true).query
  }
}
module.exports = request
```
创建application对象
```javascript
let http = require('http')
let request = require('./request')
let response = require('./response')
let context = require('./context')

// 组合中间件
// function compose (middlewares) {
//   return async ctx => {
//     function createNext (middleware, next) {
//       return async function () {
//         await middleware(ctx, next)
//       }
//     }
//     let next = async _ => {
//       return Promise.resolve()
//     }
//     for (let i = middlewares.length - 1; i >= 0; i--) {
//       next = createNext(middlewares[i], next)
//     }
//     next()
//   }
// }

function compose(middlewares) {
  return async ctx => {
    let next = async _ => {
      return Promise.resolve()
    }
    for (let len = middlewares.length; len > 0; len--) {
        next = function(next) {
          return async function() {
            return middlewares[len - 1](ctx, next)
          }
        }(next)
    }
    await next()
  }
}

class Application {
  // 构造函数
  constructor () {
    this.callbackFunc = ''
    this.request = request
    this.response = response
    this.context = context
    this.middlewares = []
  }
  // 开启http请求并传入callback
  listen (...args) {
    let server = http.createServer(this.callback())
    server.listen(...args)
  }
  // 挂载回调函数
  use (middleware) {
    this.middlewares.push(middleware)
  }
  /*
  *获取http server所需的callback函数
  *@return {Function} fn
  */
  callback () {
    return (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      let ctx = this.createContext(req, res)
      let respond = () => this.responseBody(ctx)
      let callback = compose(this.middlewares)
      callback(ctx).then(respond).catch(err => {
        console.log(err, 'errormessage 🐶')
      })
    }
  }

/**
 * 构造ctx
 * @param {Object} req node req 实例
 * @param {Object} res node res 实例
 */
  createContext (req, res) {
    let ctx = Object.create(this.context) // 这里为什么要将context赋值给this呢，感觉c没必要
    ctx.response = Object.create(this.response)
    ctx.request = Object.create(this.request)
    ctx.path = req.url
    ctx.res = ctx.response.res = res
    ctx.req = ctx.request.req = req
    return ctx
  }

  /**
   * 返回客户端数据的方法
   *
   */
  responseBody (ctx) {
    let content = ctx.body
    let {type} = ctx
    if (type === 'html') {
      ctx.res.setHeader("Content-Type","text/html;charset='utf-8'")
    }
    if (typeof content === 'string') {
      ctx.res.end(content)
    } else if (typeof content === 'object') {
      ctx.res.end(JSON.stringify(content))
    }
  }
}

module.exports = {
  Application,
  compose
}

```

创建context对象
```javascript
let fs = require('fs')
let proto = {}

function delegateSetter (property, name) {
  proto.__defineSetter__(name, function (val) {
    this[property][name] = val
  })
}

function delegateGetter (property, name) {
  proto.__defineGetter__(name, function () {
    return this[property][name]
  })
}

let requestSetter = []
let requestGetter = ['query']

let responseSetter = ['status', 'body']
let responseGetter = responseSetter.concat()
requestSetter.forEach(val => {
  delegateSetter('request', val)
})
requestGetter.forEach(val => {
  delegateGetter('request', val)
})
responseGetter.forEach(val => {
  delegateGetter('response', val)
})
responseSetter.forEach(val => {
  delegateSetter('response', val)
})

proto.redirect = function (url) {
  this.type = 'html'
  this.body = `
    Redirecting to <a id="redirect" href="${url}">${url}'</a>.
    <script>document.getElementById('redirect').click()</script>
  `
}

proto.render = function (url) {
  this.type = 'html'
  this.body = fs.readFileSync(process.cwd() + url).toString()
}

module.exports = proto

```
