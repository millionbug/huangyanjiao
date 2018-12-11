# 路由中间件设计

------
```javascript
//本来为了实现koa路由中的灵活匹配方式，以及路由的多样性，使用了非常//复杂的正则表达式规则来进行匹配路由，是参考的《深入浅出node》但是///有个bug我又不会，最后只好放弃了路由多样性，不过路由的设计还是保留//了。路由在koa的洋葱模型中，其实也是一个中间件，不过这个中间件是要
//找到匹配当前请求的注册的controller并执行而已
let compose = require('./app').compose
let pathRegexp = function (path) {
  path = path
    // .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star){
      slash = slash || ''
      return ''
      + (optional ? '' : slash)
      + '(?:' + (optional ? slash : '')
      + (format || '')
      + (capture || (format && '([^/.]+?)' || '([^/]+?)'))
      + ')'
      + (optional || '')
      + (star ? '(/*)?' : '')
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)')
    return new RegExp('^' + path + '$')
}

class Router {
  constructor() {
    this.routes = []
    this.handle = {}
  }
  use(path, controller, middlewares) {
    /**我不会正则，简化路由的匹配这段代码需要修改匹配方法 */
    let handleFunc = []
    if (middlewares) handleFunc = handleFunc.concat(middlewares)
    if (controller) handleFunc = handleFunc.concat(controller)
    let controllerMix = compose(handleFunc)
    this.handle[path] = controllerMix
  }
  match(path) {
    /**我不会正则，简化匹配方案 */
    if (this.handle[path]) return this.handle[path]
    let index;
    if (path.indexOf('?') > 0) {
      index = path.indexOf('?')
    }
    path = path.slice(0, index)
    return this.handle[path]
  }
  routeMiddle() {
    let route = this
    return async function (ctx, next) {
      let path = ctx.path
      let matchedHandle = route.match(path)
      if (!matchedHandle) {
        console.log(route.handle)
        console.log(path, 'note matched👋')
        return
      }
      await matchedHandle(ctx)
      next()
    }
  }
}

module.exports = Router

```