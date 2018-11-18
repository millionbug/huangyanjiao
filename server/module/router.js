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
    let pathReagexpResult = pathRegexp(path)
    this.routes.push(pathReagexpResult)
    let handleFunc = []
    if (middlewares) handleFunc = handleFunc.concat(middlewares)
    if (controller) handleFunc = handleFunc.concat(controller)
    let controllerMix = compose(handleFunc)
    this.handle[pathReagexpResult] = {
      path, controller: controllerMix
    }
  }
  match(path) {
    for (let i = 0, len = this.routes.length; i < len; i++) {
      if (this.routes[i].exec(path)) {
        return this.handle[this.routes[i]]
      }
    }
  }
  routeMiddle() {
    let route = this
    return async function (ctx, next) {
      let path = ctx.path
      let matchedHandle = route.match(path)
      if (!matchedHandle) return
      // ctx.body = matchedHandle['controller'].toString()
      await matchedHandle['controller'](ctx)
      next()
    }
  }
}

module.exports = Router
