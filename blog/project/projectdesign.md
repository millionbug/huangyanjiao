# 项目构建的思考

------

以一个博客为例，博客页面使用vue来构建，API服务由node + koa2来提供。就有下面几个问题

> * 1.先想好你自己要的是什么
> * 2.实现你想要的应该怎么做
> * 3.这么做有什么问题不明白
> * 4.解决这个问题

1.我想要的是一个博客项目，有一个博客首页，首页有一个文章列表，每一个文章的链接可以点击跳转到具体的文章详情页面。
2.怎么做：
（1）用vue + web pack + webpack-dev-server可以很轻松的构建一个前端项目，并且这个项目可以自动更新代码很轻松的开发，但是文章列表怎么获取
解决方案：文章列表的获取可以通过ajax接口，这在前后端分离的情况下是可以通过前端的webpack-dev-server是8080端口通过proxy代理到3000的API server端口解决
（2）获取文章详情，文章内容怎么获取，如果再使用ajax获取就显得非常难堪了
解决方案：这时候需要点击详情链接作为新的页面，然后这个页面的请求直接到后端，后端读取到具体的内容文件，md格式通过包转换为html然后生成完整的页面返回
（3）可以再进一步请求3000/index的时候返回webpack-dev-server的生成的html与js文件，这样就不会存在跨域了。如何做到访问3000端口的时候返回dist目录下的index.hml与index.js文件
解决方案：中间件，定义一个请求路径，这个请求路径就返回index.html，
（4）然后index.html的文件内引用的同目录下的相对路径./index.js又该怎么引入呢
解决方案：访问’/‘跟路由的时候并不直接返回index.html文件，而是返回一个自动执行的index.html文件，index.html文件中的js代码跳转到首页存在的路径，再把所有的需要请求的静态资源放在静态目录下
