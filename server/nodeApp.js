let {Application} = require('./module/app')
let routes = require('./controller/routers.js')
let app = new Application()
let staticServer = require('./module/staticServer.js')

app.use(staticServer('/dist', '/dist'))
app.use(staticServer('/img', '/img'))
app.use(staticServer('/renderStatic', '/renderStatic'))


app.use(async (ctx, next) => {
  let req = ctx.req;
  let ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  console.log(ip, '🚗🚗✈️✈️')
  await next();
})

app.use(routes)


app.listen('80', _ => console.log('running in localhost:80'))
