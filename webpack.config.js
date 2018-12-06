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
    // filename: './[hash]index.js',
    filename: './index.js',
    hashDigestLength: 8
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    inline: true,
    port: 8082,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000', //http必须
        changeOrigin: true,
      },
      // "/api/RoomApi/game": {
      //   "target": "http://open.douyucdn.cn",
      //   "changeOrigin":true
      // },
      
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
        'sass-loader'
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