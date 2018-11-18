let {Application} = require('./module/app');
let routes = require('./routers.js');
let app = new Application();


app.use(async (ctx, next) => {
  console.log(ctx.req.url, 'app.req.url===========')
  next();
})
app.use(routes)


app.listen('3000', _ => console.log('running in localhost:3000'));
