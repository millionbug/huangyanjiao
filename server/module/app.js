let http = require('http')
let request = require('./request')
let response = require('./response')
let context = require('./context')

// 组合中间件
function compose (middlewares) {
  return async ctx => {
    function createNext (middleware, next) {
      return async function () {
        middleware(ctx, next)
      }
    }
    let next = async _ => {
      return Promise.resolve()
    }
    for (let i = middlewares.length - 1; i >= 0; i--) {
      next = createNext(middlewares[i], next)
    }
    next()
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
