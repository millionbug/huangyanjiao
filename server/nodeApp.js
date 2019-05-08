let {Application} = require('./module/app')
let routes = require('./controller/routers.js')
let staticServer = require('./module/staticServer.js')
let wsserver = require('./controller/wscontroller.js')
let port = '80'

let app = new Application()

app.use(staticServer('/dev', '/dev'))
app.use(staticServer('/prod', '/prod'))
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
//我晕，如果用pm2启动的话，会导致pm2和cross-env的参数混乱，这个时候node_env会失效，，，暂时不解决了
//https://stackoverflow.com/questions/46561563/start-nodejs-app-that-use-cross-env-with-pm2
console.log(process.env.NODE_ENV, '🐶')
if (process.env.NODE_ENV === 'development') {
  port = '3000'
}

let server = app.listen(port , _ => console.log('running in localhost:', port))
wsserver(server)