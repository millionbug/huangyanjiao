目录
1 Node概览
1.1 为什么要用Node？
1.2 为什么要前后端分离？
1.3 Node的架构分层，各层功能？
1.4 Node核心模块有哪些？
2 Node全局对象
2.1 Node全局对象有哪些?
2.2 console常用方法有哪些?
2.3 Node定时功能有哪些?
2.4 Node中的事件循环
2.5 Node中的Buffer应用场景?
3 EventEmitter
3.1 什么是EventEmitter?
3.2 如何实现一个EventEmitter?
3.3 EventEmitter的典型应用有哪些?
3.4 如何捕获EventEmitter错误事件
3.5 EventEmitter中的newListenser事件有什么用处?
4 Stream
4.1 什么是Stream?
4.2 Stream有什么好处?
4.3 Stream典型应用有哪些?
4.4 怎么捕获Stream的错误事件?
4.5 常用Stream有哪些，分别什么时候使用?
4.6 如何实现一个Writable Stream?
5 文件系统
5.1 内置的fs模块架构是什么样子的?
5.2 读写一个文件有多少种方法?
5.3 怎么读取json配置文件?
5.4 fs.watch和fs.watchFile有什么区别，怎么应用?
6 网络
6.1 Node的网络模块架构是什么样子的?
6.2 node是怎样支持https、tls的?
6.3 实现一个简单的http服务器?
7 child-process
7.1 为什么需要child-process?
7.2 exec、execFile、spawn和fork都是做什么用的?
7.3 实现一个简单的命令行交互程序?
7.4 两个node程序之间怎样交互?
7.5 怎样让一个js文件变得像linux命令一样可执行?
7.6 child-process和process的stdin、stdout、stderror是一样的吗?
8 node高级话题(异步，部署，性能调优，异常调试等)
8.1 node中的异步和同步怎么理解
8.2 有哪些方法可以进行异步流程的控制?
8.3 怎样绑定node程序到80端口?
8.4 有哪些方法可以让node程序遇到错误后自动重启?
8.5 怎样充分利用多个CPU?
8.6 怎样调节node执行单元的内存大小?
8.7 程序总是崩溃，怎样找出问题在哪里?
8.8 有哪些常用方法可以防止程序崩溃?
8.9 怎样调试node程序?
9 常用知名第三方类库(Async, Express等)
9.1 async都有哪些常用方法，分别是怎么用?
9.2 async.parallel并行执行完多个函数后，调用结束函数
9.3 express项目的目录大致是什么样子的
9.4 express常用函数
9.5 express中如何获取路由的参数
9.6 express response常用方法有哪些
9.7 Koa框架
9.8 Koa 与 express 区别在哪
9.9 Koa如何实现在context上也能使用context.request 的许多属性？
10 配置相关
10.1 package.json中版本号如何限定？
1 Node概览
1.1 为什么要用Node？
参考答案：

总结起来node有以下几个特点：强大，轻量可扩展。

强大体现在非阻塞IO，可以适应分块传输数据，较慢的网络环境，尤其擅长高并发访问；

轻量体现在node本身既是代码，又是服务器，前后端使用统一语言；

可扩展体现在可以轻松应对多实例，多服务器架构，同时有海量的第三方包。

路由设计，控制逻辑。

渲染页面，体验优化。

从后端抽离服务治理相关的东西，如单点登录，鉴权，日志等，让后端聚焦于业务逻辑代码。

1.2 为什么要前后端分离？
参考答案：

开发效率高

前端开发人员不用苦苦地配置各种后端环境，安装各种莫名的插件，摆脱对后端开发环境的依赖，一门心思写前端代码就好，后端开发人员也不用时不时的跑去帮着前端配环境。

职责清晰，找bug方便

以前有了bug，前端推后端，后端推前端，不知道该谁去该，前后端分离，是谁的问题就该谁去处理，处理问题方便很多，后期代码重构方便，做到了高可维护性。

1.3 Node的架构分层，各层功能？
参考答案：

主要分为三层，应用app >> V8及node内置架构 >> 操作系统。

V8是node运行的环境，可以理解为node虚拟机。

node内置架构又可分为三层: Node标准库 >> Node绑定（socket，http，file system...） >> libuv + V8（JS engine）

1.4 Node核心模块有哪些？
参考答案：

EventEmitter, Stream, FS, Net和全局对象

2 Node全局对象
2.1 Node全局对象有哪些?
参考答案：

process, console, Buffer和exports

2.2 console常用方法有哪些?
参考答案：

console.log/console.info, console.error/console.warning, console.time/console.timeEnd, console.trace, console.table

2.3 Node定时功能有哪些?
参考答案：

setTimeout/clearTimeout, setInterval/clearInterval, setImmediate/clearImmediate, process.nextTick

2.4 Node中的事件循环
参考答案：

总体上执行顺序是：process.nextTick >> setImmidate >> setTimeout/SetInterval 

2.5 Node中的Buffer应用场景?
参考答案：

Buffer是用来处理二进制数据的，比如图片，mp3，数据库文件等。Buffer支持各种编码解码，二进制字符串互转。

3 EventEmitter
3.1 什么是EventEmitter?
参考答案：

EventEmitter是node中一个实现观察者模式的类，主要功能是监听和发射消息，用于处理多模块交互问题。

3.2 如何实现一个EventEmitter?
参考答案：

主要分三步：定义一个子类，调用构造函数，继承EventEmitter

代码：

EvenEmitter示例
JavaScript
var util = require('util');
var EventEmitter = require('events').EventEmitter;
​
// 构造函数
function MyEmitter() {
  EventEmitter.call(this);
} 
// 继承
util.inherits(MyEmitter, EventEmitter); 
​
var em = new MyEmitter();
// 接收事件，并打印到控制台
em.on('hello', function(data) {
  console.log('收到事件hello的数据:', data);
}); 
em.emit('hello', 'EventEmitter传入的参数');
3.3 EventEmitter的典型应用有哪些?
参考答案：

模块间传递消息

回调函数内外传递消息

处理流数据，因为流是在EventEmitter基础上实现的

观察者模式发射触发机制相关应用

3.4 如何捕获EventEmitter错误事件
参考答案：

监听error事件即可。如果有多个EventEmitter，也可以用domain来统一处理错误事件。

使用domian统一处理EventEmitter错误
JavaScript
var domain = require('domain');
var myDomain = domain.create();
// 接收error事件并打印
myDomain.on('error', function(err){
  console.log('domain接收到的错误事件:', err);
}); 
myDomain.run(function(){
  var emitter1 = new MyEmitter();
  emitter1.emit('error', '错误事件来自emitter1');
  emitter2 = new MyEmitter();
  emitter2.emit('error', '错误事件来自emitter2');
});
3.5 EventEmitter中的newListenser事件有什么用处?
参考答案：

newListener可以用来做事件机制的反射，特殊应用，事件管理等。

当任何on事件添加到EventEmitter时，就会触发newListener事件，基于这种模式，我们可以做很多自定义处理。

代码：

代码块
JavaScript
var emitter3 = new MyEmitter();
emitter3.on('newListener', function(name, listener) {
  console.log("新事件的名字:", name);
  console.log("新事件的代码:", listener);
  setTimeout(function(){ console.log("我是自定义延时处理机制"); }, 1000);
});
emitter3.on('hello', function(){
  console.log('hello　node');
});
4 Stream
4.1 什么是Stream?
参考答案：

stream是基于事件EventEmitter的数据管理模式。由各种不同的抽象接口组成，主要包括可写，可读，可读写，可转换等几种类型。

4.2 Stream有什么好处?
参考答案：

非阻塞式数据处理提升效率，片断处理节省内存，管道处理方便可扩展等。

4.3 Stream典型应用有哪些?
参考答案：

文件，网络，数据转换，音频视频等。

4.4 怎么捕获Stream的错误事件?
参考答案：

监听error事件，方法同EventEmitter。

4.5 常用Stream有哪些，分别什么时候使用?
参考答案：

Readable为可被读流，在作为输入数据源时使用；

Writable为可被写流,在作为输出源时使用；

Duplex为可读写流,它作为输出源接受被写入，同时又作为输入源被后面的流读出；

Transform机制和Duplex一样，都是双向流，区别时Transfrom只需要实现一个函数_transfrom(chunk, encoding, callback)；而Duplex需要分别实现_read(size)函数和_write(chunk, encoding, callback)函数。

4.6 如何实现一个Writable Stream?
参考答案：

步骤

构造函数call Writable

继承Writable

实现_write(chunk, encoding, callback)函数

代码：

代码块
JavaScript
var Writable = require('stream').Writable;
var util = require('util');
​
// 构造函数
function MyWritable(options) {
  Writable.call(this, options);
}
​
// 继承自Writable
util.inherits(MyWritable, Writable);
MyWritable.prototype._write = function(chunk, encoding, callback) {
  console.log("被写入的数据是:", chunk.toString()); // 此处可对写入的数据进行处理
  callback();
};
process.stdin.pipe(new MyWritable()); // stdin作为输入源，MyWritable作为输出源
5 文件系统
5.1 内置的fs模块架构是什么样子的?
参考答案：

fs模块主要由下面几部分组成：

POSIX文件Wrapper,对应于操作系统的原生文件操作

文件流 fs.createReadStream和fs.createWriteStream

同步文件读写,fs.readFileSync和fs.writeFileSync

异步文件读写, fs.readFile和fs.writeFile

5.2 读写一个文件有多少种方法?
参考答案：

总体来说有四种：

POSIX式低层读写

流式读写

同步文件读写

异步文件读写

5.3 怎么读取json配置文件?
参考答案：

主要有两种方式

第一种是利用node内置的require('data.json')机制，直接得到js对象；

第二种是读入文件入内容，然后用JSON.parse(content)转换成js对象。

二者的区别是require机制情况下，如果多个模块都加载了同一个json文件，那么其中一个改变了js对象，其它跟着改变，这是由node模块的缓存机制造成的，只有一个js模块对象；第二种方式则可以随意改变加载后的js变量，而且各模块互不影响，因为他们都是独立的，是多个js对象。

5.4 fs.watch和fs.watchFile有什么区别，怎么应用?
参考答案：

二者主要用来监听文件变动。fs.watch利用操作系统原生机制来监听，可能不适用网络文件系统；fs.watchFile则是定期检查文件状态变更，适用于网络文件系统，但是相比fs.watch有些慢，因为不是实时机制。

6 网络
6.1 Node的网络模块架构是什么样子的?
参考答案：

node全面支持各种网络服务器和客户端，包括tcp, http/https, tcp, udp, dns, tls/ssl等。

6.2 node是怎样支持https、tls的?
参考答案：

主要实现以下几个步骤即可：

openssl生成公钥私钥

服务器或客户端使用https替代http

服务器或客户端加载公钥私钥证书

6.3 实现一个简单的http服务器?
参考答案：

经典又很没意义的一个题目。思路是加载http模块，创建服务器，监听端口。

代码：

代码块
JavaScript
var http = require('http'); // 加载http模块
​
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'}); // 200代表状态成功, 文档类型是给浏览器识别用的
  res.write('<meta charset="UTF-8"> <h1>我是标题啊！</h1> <font color="red">这么原生，初级的服务器，下辈子能用着吗?!</font>'); // 返回给客户端的html数据
  res.end(); // 结束输出流
}).listen(3000); // 绑定3ooo, 查看效果请访问 http://localhost:3000 
7 child-process
7.1 为什么需要child-process?
参考答案：

node是异步非阻塞的，这对高并发非常有效．可是我们还有其它一些常用需求，比如和操作系统shell命令交互，调用可执行文件，创建子进程进行阻塞式访问或高CPU计算等，child-process就是为满足这些需求而生的。child-process顾名思义，就是把node阻塞的工作交给子进程去做。

7.2 exec、execFile、spawn和fork都是做什么用的?
参考答案：

exec可以用操作系统原生的方式执行各种命令，如管道 cat ab.txt | grep hello；

execFile是执行一个文件；

spawn是流式和操作系统进行交互；

fork是两个node程序(javascript)之间时行交互。

7.3 实现一个简单的命令行交互程序?
参考答案：

用spawn、其他第三方库如inquirer

代码：

代码块
JavaScript
var cp = require('child_process');
var child = cp.spawn('echo', ['你好', "钩子"]); // 执行命令
child.stdout.pipe(process.stdout); // child.stdout是输入流，process.stdout是输出流
// 这句的意思是将子进程的输出作为当前程序的输入流，然后重定向到当前程序的标准输出，即控制台
7.4 两个node程序之间怎样交互?
参考答案：

用fork，上面讲过了。原理是子程序用process.on, process.send，父程序里用child.on，child.send进行交互。

代码：

fork-parent.js
JavaScript
var cp = require('child_process');
var child = cp.fork('./fork-child.js');
child.on('message', function(msg){
  console.log('parent从child接受到数据:', msg);
});
child.send('parent‘s comming');
fork-child.js
JavaScript
process.on('message', function(msg){
  console.log("child从parent接收到的数据:", msg);
  process.send("love you");
});
7.5 怎样让一个js文件变得像linux命令一样可执行?
参考答案：

在myCommand.js文件头部加入 #!/usr/bin/env node

chmod命令把js文件改为可执行即可

进入文件目录，命令行输入myComand就是相当于node myComand.js了

7.6 child-process和process的stdin、stdout、stderror是一样的吗?
参考答案：

概念都是一样的，输入，输出，错误，都是流。

区别是在父程序眼里，子程序的stdout是输入流，stdin是输出流。

8 node高级话题(异步，部署，性能调优，异常调试等)
8.1 node中的异步和同步怎么理解
参考答案：

node是单线程的，异步是通过一次次的循环事件队列来实现的。

同步则是说阻塞式的IO，这在高并发环境会是一个很大的性能问题，所以同步一般只在基础框架的启动时使用，用来加载配置文件，初始化程序什么的。

8.2 有哪些方法可以进行异步流程的控制?
参考答案：

多层嵌套回调

为每一个回调写单独的函数，函数里边再回调

用第三方框架比方async, q, promise等

8.3 怎样绑定node程序到80端口?
参考答案：

sudo

apache/nginx代理

用操作系统的firewall iptables进行端口重定向

8.4 有哪些方法可以让node程序遇到错误后自动重启?
参考答案：

runit

forever

nohup npm start &

pm2

8.5 怎样充分利用多个CPU?
参考答案：

一个CPU运行一个node实例

8.6 怎样调节node执行单元的内存大小?
参考答案：

用--max-old-space-size 和 --max-new-space-size 来设置 v8 使用内存的上限

8.7 程序总是崩溃，怎样找出问题在哪里?
参考答案：

node --prof 查看哪些函数调用次数多

memwatch和heapdump获得内存快照进行对比，查找内存溢出

8.8 有哪些常用方法可以防止程序崩溃?
参考答案：

try-catch-finally

EventEmitter/Stream error事件处理

domain统一控制

lint静态检查

jasmine/mocha进行单元测试

8.9 怎样调试node程序?
参考答案：

node --debug app.js 和node-inspector

9 常用知名第三方类库(Async, Express等)
9.1 async都有哪些常用方法，分别是怎么用?
参考答案：

async是一个js类库，它的目的是解决js中异常流程难以控制的问题。async不仅适用在node.js里，浏览器中也可以使用。

9.2 async.parallel并行执行完多个函数后，调用结束函数
代码块
JavaScript
async.parallel([
  function(){ ... },
  function(){ ... }
], callback);
​
async.series串行执行完多个函数后，调用结束函数
async.series([
  function(){ ... },
  function(){ ... }
]);
​
async.waterfall依次执行多个函数，后一个函数以前面函数的结果作为输入参数
async.waterfall([
  function(callback) {
    callback(null, 'one', 'two');
  },
  function(arg1, arg2, callback) {
  // arg1 now equals 'one' and arg2 now equals 'two' 
    callback(null, 'three');
  },
  function(arg1, callback) {
  // arg1 now equals 'three' 
    callback(null, 'done');
  }
], function (err, result) {
  // result now equals 'done' 
});
​
async.map异步执行多个数组，返回结果数组
async.map(['file1','file2','file3'], fs.stat, function(err, results){
  // results is now an array of stats for each file 
});
​
async.filter异步过滤多个数组，返回结果数组
async.filter(['file1','file2','file3'], fs.exists, function(results){
  // results now equals an array of the existing files 
});
9.3 express项目的目录大致是什么样子的
参考答案：

app.js, package.json, bin/www, public, routes, views.

9.4 express常用函数
参考答案：

express.Router路由组件,app.get路由定向，app.configure配置，app.set设定参数,app.use使用中间件

9.5 express中如何获取路由的参数
参考答案：

/users/:name使用req.params.name来获取; req.body.username则是获得表单传入参数username; express路由支持常用通配符 ?, +, *, and ()

9.6 express response常用方法有哪些
参考答案：

res.download() 弹出文件下载

res.end() 结束response

res.json() 返回json

res.jsonp() 返回jsonp

res.redirect() 重定向请求

res.render() 渲染模板

res.send() 返回多种形式数据

res.sendFile 返回文件

res.sendStatus() 返回状态

9.7 Koa框架
参考答案：

Koa 是由 Express 原班人马打造的 Web 框架，更小、更健壮。 

使用 Koa 通过组合不同的 Generator，可以避免重复繁琐的回调函数嵌套， 并极大地提升错误处理的效率。

Koa 不在内核方法中绑定任何中间件， 它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

Koa 中也包含4个主要模块，Application、Request、Response、Context。

Koa 几乎没有任何限制，同时Koa 不断追随Esmascript规范，解决Express痛点，从一代generator函数到二代Async/Await，备受青睐。

9.8 Koa 与 express 区别在哪
参考答案：

框架

对应

特性

express

es5

回调嵌套

koa

es6

Generator函数+yield语句+Promise

koa2

es7

async/await+Promise

9.9 Koa如何实现在context上也能使用context.request 的许多属性？
例如：

ctx.header 获取请求头

ctx.method 获取请求方法

ctx.url 获取请求 URL

...

又例如：

ctx.body 设置响应体

ctx.status 设置响应状态码

ctx.redirect() 请求重定向

...

参考答案：

使用委托。

对请求参数的获取都得益于 koa 中 context.request 的许多属性都被委托在了 context 上。

对响应参数的设置都得益于 koa 中 context.response 的许多属性和方法都被委托在了 context 上：

代码：

JavaScript
// Koa 源码 lib/context.js
delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .access('path')
  .access('url')
  .getter('headers')
  .getter('ip');
  // ...
delegate(proto, 'response')
  .method('redirect')
  .method('vary')
  .access('status')
  .access('body')
  .getter('headerSent')
  .getter('writable');
  // ...
10 配置相关
10.1 package.json中版本号如何限定？
参考答案：

指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。

波浪号（tilde）+指定版本：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。

插入号（caret）+指定版本：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。

latest：安装最新版本。

