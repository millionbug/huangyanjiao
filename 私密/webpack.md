一、入口

定义：指示webpack应使用哪个模块，来作为构建内部依赖的主文件。即通过入口文件，找到引入的依赖文件，处理这些文件后，输出到bunldes文件中
```javascript
 module.exports = {

    entry: './test/main.js'

  }
```

二、输出

定义：告诉webpack在哪里输出所创建的bundles，以及如何命名（一般习惯用build.js）

三、loader

定义：用来处理非JS文件。将所有类型的文件转换为webpack能够处理的有效模块。

参数： 

test - 用于标识出应该被对应的 loader 进行转换的某个或某些文件 

use - 表示进行转换时，应该使用哪个 loader

四、插件

定义：插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量

Webpack常见问题汇总

1.dependencies与devDependencies之间的区别（即–save-dev 和 –save的区别）

两者都是pakeage.json文件中的对象。通过 npm install --save-dev 或 npm install -D安装的插件，被写入到 devDependencies 对象里面去；通过 npm install --save 或 npm install -S安装的插件 ，则被写入到 dependencies 对象里面去。

dependencies是发布到线上需要打包或用到的文件，即项目运行所依赖的模块，而devDependencies指本地开发所需要的模块，不需要被打包。

pakeage.json文件的配置只起提示作用，并不影响实际的安装，npm安装模块后自动记录到pakeage.json中。使用npm i可以一键安装配置好的内容。

2. loader的作用和写法

loader将浏览器不能识别的语言转换成可识别的

loader的使用方式有三种： 

配置（推荐）：在 webpack.config.js 文件中指定 loader。 

内联：在每个 import 语句中显式指定 loader。 

CLI：在 shell 命令中指定它们。

语法格式见官网

示例一：

```javascript
module.exports = {

  module: {

    rules: [

     {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},

    ]

  }

};
```

//test：代表正则表达式

//use: 加载器

//exclude：用来排除一些不需要转换的JS

示例二：

```javascript
module.exports = {

  module: {

    rules: [

     {test: /\.less$/, use: ['style-loader','css-loader?sourceMap','less-loader?sourceMap']}

    ]

  }

};
```

//?sourceMap定义出错位置

3.path和publicPath的区别

path是JS文件（如：main.js）打包后生成的文件（如：build.js）输出目录的绝对路径

publicPath是各种静态资源的引用路径，为虚拟路径

4.devServer.proxy

如果有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，使用devServer.proxy代理一些 URL

```javascript
devServer: {            //解决跨域，在同域名下发送 API 请求

        port: 80,

        disableHostCheck: true,

        proxy: {

            '/daikou/a': {

                target: 'xxx',          //目标域名              

                changeOrigin: true      //本地虚拟一个服务端接收请求并发送该请求

            }

        }

    }

```