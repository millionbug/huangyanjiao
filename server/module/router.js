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
    console.log(typeof this.handle[path])
  }
  match(path) {
    /**我不会正则，简化匹配方案 */
    path = path.slice(0, path.indexOf('?'))
    return this.handle[path]
  }
  routeMiddle() {
    let route = this
    return async function (ctx, next) {
      let path = ctx.path
      let matchedHandle = route.match(path)
      if (!matchedHandle) return
      await matchedHandle(ctx)
      next()
    }
  }
}

module.exports = Router
