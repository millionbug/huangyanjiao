let {Application} = require('./module/app');
let Router = require('./module/router');

let fs = require('fs');

let router = new Router;
let app = new Application();


router.use('/', (ctx, next) => {
  console.log(ctx.req.url, 'request path=========')
  ctx.body = fs.readFileSync(process.cwd() + '/dist/index.html').toString();
  next();
})
app.use(async (ctx, next) => {
  console.log(ctx.req.url, 'app.req.url===========')
  next();
})
app.use(router.routeMiddle())


app.listen('3000', _ => console.log('running in localhost:3000'));
