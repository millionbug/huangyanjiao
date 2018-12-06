let {Application} = require('./module/app')
let routes = require('./routers.js')
let app = new Application()
let staticServer = require('./staticServer.js')

app.use(staticServer('/dist', '/dist'))
app.use(staticServer('/img', '/img'))
app.use(staticServer('/renderStatic', '/renderStatic'))

app.use(routes)


app.listen('3000', _ => console.log('running in localhost:3000'))
