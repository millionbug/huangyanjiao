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
    if (ctx.req.url.indexOf(path) === 0) {
      console.log(ctx.req.url, path, '🌹')
      let type = mimeType.find(type => ctx.req.url.indexOf('.' + type) > 0)
      if (type) {
        let stream = fs.createReadStream(process.cwd() + ctx.req.url)
        ctx.res.setHeader("Content-Type", mime[type])
        stream.on('error', err => console.log(err))
        stream.pipe(ctx.res)
        return
      }
    } else {
      await next()
    }
  }
}