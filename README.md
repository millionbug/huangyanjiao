# huangyanjiao
黄岩脚的博客（yangsir_v@qq.com）
使用yarn进行包管理

前端页面使用vue + vue-router 

启用3000端口监听静态资源请求与API请求避免跨域问题

node端koa + koa-router + static-server都是我自己实现的，API有细微不同
koa:server/module/ 
static-server: server/staticServer.js
koa-router: server/module/router.js

启动：
1.先webpack编译
2.node ./server/nodeApp.js
