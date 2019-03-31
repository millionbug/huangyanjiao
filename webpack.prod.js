let path = require('path');
let vueloaderplugin = require('vue-loader/lib/plugin');
let htmlwebpackplugin = require('html-webpack-plugin');
let UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
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
        <title>welcome 友善一点哦😯</title>
      </head>
      <body>
        <div id="app"></div>
        <link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">  
        <script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>  
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <script type="text/javascript" src="/prod/index.js"></script>
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
    //线上的文件单独存放在prod中
    path: path.resolve(__dirname, './prod'),
    // filename: './[hash]index.js',
    filename: './index.js',
    hashDigestLength: 8
  },
  externals: { //9M -》 900k -> 182k
    'marked': 'marked',
    'highlight.js': 'hljs'
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
      loader: 'babel-loader',
      exclude: /(node_mudules)/,
      options: {
        presets: ['es2015']
     }
    }, {
      test: /\.(scss|css)$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
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
    new UglifyJSPlugin({
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      },
      output: {
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
      }
    }),
    new htmlwebpackplugin(htmlwebpackpluginconfig),
    new vueloaderplugin()
  ]
}