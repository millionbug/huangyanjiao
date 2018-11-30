// const path = requrie('path')
// const webpack = require('webpack')
// const merge = require('webpack-merge')
// const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const webpack = require('webpack')

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
  entry: './server/render/blog.js',
  target: 'node',
  output: {
    path: process.cwd() + '/server/render/webpackOutPut',
    filename: 'serverRenderBlog.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'eval-source-map',
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
        'css-loader'
      ]
    }, {
      test: /\.html$/,
      use: 'vue-template-loader'
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin(),
    new htmlwebpackplugin(htmlwebpackpluginconfig),
    new vueloaderplugin(),
  ]
}