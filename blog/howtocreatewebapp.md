# 一个web项目的构建vue + koa2 + webpack + node

------

以一个博客为例，博客页面使用vue来构建，API服务由node + koa2来提供。就有下面几个问题

> * 1.浏览器无法解析扩展名为.vue的页面文件的，那么就需要使用node + webpack来解析.vue文件，生成浏览器可以识别的.html .script .css文件
> * 2.开发过程中，频繁修改样式然后刷新页面很繁琐，希望能够修改代码之后浏览器自动加载修改的部分，刷新页面
> * 3.前后端分离，前端启用8080接口输出页面，node启用3000端口前端的API请求就会涉及到跨域问题

一、首先解决第一个，前端页面的开发是以如下代码作为整个项目的入口文件开始的
```javascript
import Vue from 'vue';
import Router from 'vue-router';
import routes from './client/router.js';

Vue.use(Router)

let router = new Router({
  routes
})
new Vue({
  el: '#app',
  router,
  template: `<div>
    <router-view></router-view>
  </div>`
})
```
```vue
<template>
<div>dom yuan su</div>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style></style>
```
这里要解决的就是对扩展名.vue的文件的解析，需要配置webpack内容，新建webpack.config.json文件。 解析.vue文件的内容是以下几步：
> * 入口index.js文件的import 语法的解析，这需要安装babel
> * .vue文件的加载，安装vue-loader
> * .vue文件中javascript如果使用了es6之类的高级语法那么也需要对.vue文件中javascript应用你的js的规则，style是scss的语法也需要对style应用设置的scss解析规则，安装vue-loader-plugin

所有的这些都是由node的webpack模块完成，首先初始化项目在你希望的位置，执行npm init 生成项目，然后执行
npm install webpack //安装webpack
npm install babel-core babel-loader babel-preset-env //安装babel，babel其实是很多个包，多个包之间用空格隔开
npm install vue-loader vue-loader-plugin vue-style-loader vue-html-loaer //安装vue-loader来加载vue文件，安装vue-style-loader用来解析vue文件中的内联样式，vue-html-loader将template标签的内容编译为相应的生成div的render方法，安装vue-loader-plugin确保设置的对css和javascript语言的解析能够作用到vue文件中
npm install vue-loader-plugin //安装vue-loader-pluin

在webpack中的具体写法
```javascript
let path = require('path');
let vueloaderplugin = require('vue-loader/lib/plugin');
let htmlwebpackplugin = require('html-webpack-plugin');
let htmlwebpackpluginconfig = { //对html-webpack-plugin插件的配置，指定一个模版html文件
  title: 'hello, 这是htmlwebpackplugin自动生成的html文件',
  filename: 'index.html',
  templateContent() {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>hello, 这是htmlwebpackplugin自动生成的html文件</title>
      </head>
      <body>
        <div id="app"></div>
      </body>
    </html>
    `
  },
  inject: true,
}
module.exports = {
  // 上下文是查找入口文件的基本目录，是一个绝对值，所以要用到path.resolve
  // 如果不设，默认为当前目录
  // 与命令行中的 webpack --context是一样的
  // 最后入口文件是 context+entry,
  // 可以写成./today/wang[前加./],./today/wang/[后加/]，不能写成/today/wang，如果../表示在当前目录再往上一层
  // context 除了这里的入口文件用到，象很多loader,plugin都会要用到这个值
  context: path.resolve(__dirname, './'),
  // entry可以为字符串|对象|数组三种形式
  // 字符串，适合spa,也就是单页网页，如手机网页
  // 下面这个entry最终的位置是 项目根目录/today/wang/app/entry.js
  // 前面./不能少，后面的.js可以省略，也可以写
  // 以下演示三种entry，实际中取一种就行
  entry: './src/main',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './[hash]index.js',
    hashDigestLength: 8
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    inline: true,
    port: 8082,
    proxy: {
      '/api/*': {
        // target: 'localhost:3000',
        target: 'http://344.fe.dev.sankuai.com/',
        // pathRewrite: {'^/api': '/api/v1'},
        changeOrigin: true,
      },
      '/blog/*': {
        target: 'http://cfe.fe.dev.sankuai.com',
        changeOrigin: true,
      },
      
    }
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'scss-loader'
      ]
    },
    //  {
    //   test: /\.html$/,
    //   use: 'vue-template-loader'
    // },
    {
      test: /\.html$/,
      use: 'vue-html-loader'
    },
     {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }]
    }]
  },
  plugins: [
    new htmlwebpackplugin(htmlwebpackpluginconfig),
    new vueloaderplugin()
  ]
}
```
