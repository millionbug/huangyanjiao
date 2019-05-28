目录
1 如何定义一个类？
2 js类继承有哪些方法？
3 js如何实现类多重继承？
4 什么是js的作用域？
5 js的this指的是什么？
6 apply，call和bind的区别
7 caller，callee和arguments的区别
8 什么是闭包，它的用处？
9 defineProperty, hasOwnProperty, propertyIsEnumerable
10 js常用设计模式
11 列举数组的常用方法（入参、返回值、使用方式）
12 列举字符串的常用方法（入参、返回值、使用方式）
13 ES6有哪些新特性
14 setTimeout六连击
15 es6中为什么要bind(this)?
16 bind与箭头函数的用法，下列哪种好？
17 函数节流
18 Promise
1 如何定义一个类？
参考答案：

主要有构造函数原型和对象创建两种方法。

原型法是通用老方法，对象创建是ES5推荐使用的方法。

目前来看，原型法更普遍。

代码：

构造函数方法定义类
JavaScript
function Person(){
  this.name = 'John';
}
​
Person.prototype.sayName = function(){
  console.log(this.name);
}
​
var person = new Person();
person.sayName();
2 js类继承有哪些方法？
参考答案：

原型链法、属性复制法和构造器应用法。另外，由于每个对象可以是一个类，这些方法也可以用于对象类的继承。

代码：

原型链法 原型链法
JavaScript
function Animal() {
  this.name = 'animal';
}
Animal.prototype.sayName = function(){
  console.log(this.name);
};
​
function Person() {}
Person.prototype = Animal.prototype; // 人继承自动物
Person.prototype.constructor = 'Person'; // 更新构造函数为人
属性复制法
JavaScript
function Animal() {
  this.name = 'animal';
}
Animal.prototype.sayName = function() {
  console.log(this.name);
};
​
function Person() {}
​
for(prop in Animal.prototype) {
  Person.prototype[prop] = Animal.prototype[prop];
} // 复制动物的所有属性到人量边
Person.prototype.constructor = 'Person'; // 更新构造函数为人
构造器法
JavaScript
function Animal() {
  this.name = 'animal';
}
Animal.prototype.sayName = function() {
  console.log(this.name);
};
​
function Person() {
  Animal.call(this); // apply, call, bind方法都可以。区别见6
}
3 js如何实现类多重继承？
参考答案：

就是类继承方法中的属性复制法来实现。因为当所有父类的prototype属性被复制后，子类自然拥有类似行为和属性。

4 什么是js的作用域？
参考答案：

大多数语言使用的都是块作用域，以{}进行限定，js中不是。js中叫函数作用域，就是一个变量在全函数里有效。

比如有个变量p1在函数最后一行定义，第一行也有效，但是值是undefined。

代码：

函数作用域
JavaScript
var globalVar = 'global var';
function test() {
  console.log(globalVar); // undefined, 因为globalVar在本函数内被重定义了，导致全局失效，这里使用函数内的变量值，可是此时还没定义
  var globalVar = 'overrided var'; //　globalVar在本函数内被重定义
  console.log(globalVar);　// overrided var
}
console.log(globalVar); // global var，使用全局变量
5 js的this指的是什么？
参考答案：

this指的是对象本身，而不是构造函数。

代码：

代码块
JavaScript
function Person() {}
Person.prototype.sayName() { console.log(this.name); }
​
var person = new Person();
person.name = 'John';
person.sayName(); // John
6 apply，call和bind的区别
参考答案：

三者都可以把一个函数应用到其他对象上，注意不是自身对象。

apply、call是直接执行函数调用，bind是绑定，执行后需要再次调用。

apply和call的区别是apply接受数组作为参数，而call是接受逗号分隔的无限多个参数列表。

代码：

apply，call和bind的区别
JavaScript
function Person() {}
Person.prototype.sayName() { console.log(this.name); }
​
var obj = {name: 'John'}; // 注意这是一个普通对象，它不是Person的实例
// 1) apply
Person.prototype.sayName.apply(obj, [param1, param2, param3]);
​
// 2) call
Person.prototype.sayName.call(obj, param1, param2, param3);
​
// 3) bind
var newFunc = Person.prototype.sayName.bind(obj); 
newFunc([param1, param2, param3]); // bind需要先绑定，再执行 
newFunc(param1, param2, param3); // bind需要先绑定，再执行
7 caller，callee和arguments的区别
参考答案：

caller，callee之间的关系就像是employer和employee之间的关系，就是调用与被调用的关系，二者返回的都是函数对象引用。

arguments是函数的所有参数列表，它是一个类数组的变量。

代码：

代码块
JavaScript
function parent(param1, param2, param3) {
  child(param1, param2, param3);
}
​
function child() {
  console.log(arguments); // { '0': 'John1', '1': 'John2', '2': 'Joh3' }
  console.log(arguments.callee); // [Function: child]
  console.log(child.caller); // [Function: parent]
}
​
parent('John1', 'John2', 'John3');
8 什么是闭包，它的用处？
参考答案：

通俗的说，闭包就是作用域范围，因为js是函数作用域，所以函数就是闭包。

全局函数的作用域范围就是全局，所以无须讨论。

更多的应用其实是在内嵌函数，这就会涉及到内嵌作用域，或者叫作用域链。

说到内嵌，其实就是父子引用关系（父函数包含子函数，子函数因为函数作用域又引用父函数，所以叫闭包），这就会带来另外一个问题，什么时候引用结束？如果不结束，就会一直占用内存，引起内存泄漏。好吧，不用的时候就将引用设为空，死结就解开了。

9 defineProperty, hasOwnProperty, propertyIsEnumerable
参考答案：

Object.defineProperty(obj, prop, descriptor)用来给对象定义属性，有value，writable，configurable，enumerable，set/get等。

hasOwnProerty用于检查某一属性是不是存在于对象本身，继承来的属性不算。

propertyIsEnumerable用来检测某一属性是否可遍历，也就是能不能用for..in循环来取到。

10 js常用设计模式
参考答案：

单例，工厂，代理，装饰，观察者模式等

代码：

1) 单例：任意对象都是单例，无须特别处理，适用场景：如日志等
JavaScript
var obj = { name: 'John', age: 30 };
2) 工厂：不同参数返回不同的实例，适用场景：根据不同参数产生不同实例，这些实例有一些共性的场景
JavaScript
function Person() { this.name = 'I am a person'; }
function Animal() { this.name = 'I am an animal'; }
​
function Factory() {}
Factory.prototype.getInstance = function(className) {
  return eval('new ' + className + '()');
}
​
var factory = new Factory();
var obj1 = factory.getInstance('Person');
var obj2 = factory.getInstance('Animal');
console.log(obj1.name); // I am a person
console.log(obj2.name); // I am an animal
3) 代理：就是新建个类调用老类的接口，包一下
JavaScript
function Person() { }
Person.prototype.sayName = function() { console.log('John'); }
Person.prototype.sayAge = function() { console.log(27); }
​
// 代理
function PersonProxy() { 
  this.person = new Person();
  var that = this;
  this.callMethod = function(functionName) {
    console.log('before proxy:', functionName);
    that.person[functionName]();
    console.log('after proxy:', functionName);
  }
}
​
var pp = new PersonProxy();
// 代理调用Person的方法sayName()
pp.callMethod('sayName'); 
// 代理调用Person的方法sayAge()  
pp.callMethod('sayAge'); 
4) 观察者: 就是事件模式，比如按钮的onclick这样的应用
JavaScript
// 发布者
function Publisher() {
  this.listeners = [];
}
Publisher.prototype = {
  'addListener': function(listener) {
    this.listeners.push(listener);
  },
​
  'removeListener': function(listener) {
    delete this.listeners[listener];
  },
​
  'notify': function(obj) {
    for(var i = 0; i < this.listeners.length; i++) {
      var listener = this.listeners[i];
      if (typeof listener !== 'undefined') {
        listener.process(obj);
      }
    }
  }
};
​
// 订阅者
function Subscriber() {}
Subscriber.prototype = {
  'process': function(obj) {
    console.log(obj);
  }
};
​
var publisher = new Publisher();
publisher.addListener(new Subscriber());
publisher.addListener(new Subscriber());
// 发布一个对象到所有订阅者
publisher.notify({name: 'John', ageo: 27});
// 发布一个字符串到所有订阅者
publisher.notify('2 subscribers will both perform process');
11 列举数组的常用方法（入参、返回值、使用方式）
参考答案：

push/pop, shift/unshift, join, slice/splice/concat, sort/reverse, map/reduce, forEach, filter

12 列举字符串的常用方法（入参、返回值、使用方式）
参考答案：

indexOf/lastIndexOf/charAt, split/match/test, slice/substring/substr, toLowerCase/toUpperCase

13 ES6有哪些新特性
参考答案：

类的支持，模块化，箭头函数，let/const块作用域，字符串模板，解构，参数默认值/不定参数/拓展参数, for-of遍历, generator, Map/Set, Promise

14 setTimeout六连击
第一击
JavaScript
for (var i = 0; i < 5; i++) {
  console.log(i);
}
// 答案： 0 1 2 3 4
第二击
JavaScript
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000 * i);
}
// 答案： 5 5 5 5 5
第三击
JavaScript
// 怎么修改输出0 1 2 3 4
// 闭包模式或者Es6的`let`
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}
第四击
JavaScript
for (var i = 0; i < 5; i++) {
  (function() {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}
// 答案： 5 5 5 5 5
第五击
JavaScript
for (var i = 0; i < 5; i++) {
  setTimeout((function(i) {
    console.log(i);
  })(i), i * 1000);
}
// 答案： 0 1 2 3 4
第六击
JavaScript
// 考察运行机制
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for( var i=0 ; i<10000 ; i++ ) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function() {
  console.log(4);
});
console.log(5);
// 答案： 2 3 5 4 1
// 解答：setTimeout属于异步进程任务，会放到任务队列等待执行
// Promise里面是立即执行函数，因此先输出2和3，then则会在当前tick的最后执行，因此会先输出5，再接着输出4，最后输出1
15 es6中为什么要bind(this)?
参考答案：

React.createClass 是es5的写法默认是绑定了bind方法，而es6中 新增加了class，绑定的方法需要绑定this，如果是箭头函数就不需要绑定this

16 bind与箭头函数的用法，下列哪种好？
代码：

代码块
JavaScript
// 写法1：
func(){}
<Component xxxx={this.func.bind(this)} />
​
// 写法2：
constructor(props) {
  super(props);
  this.func= this.func.bind(this);
}
func(){}
<Component xxxx={this.func} />
​
// 写法3：
func = () => {}
<Component xxxx={this.func} />
​
// 写法4：
func(){}
<Component xxxx={() => this.xxA} />
参考答案：

其实最终代码上 2和3是一致的 1和4是一致的

1和4的问题在于，由于绑定是在render中执行，而render是会执行多次的，每次bind和箭头函数都会产生一个新的函数，因而带来了额外的开销
2和3避免了每次产生新的函数，效果等同，显然3的写法更简洁，因而推荐3

17 函数节流
参考答案：

debounce：

将短时间内多次触发的事件合并成一次事件响应函数执行（往往是在第一次事件或者在最后一次事件触发时执行），即该段时间内仅一次真正执行事件响应函数。

throttle：

假如在短时间内同一事件多次触发，那么每隔一段更小的时间间隔就会执行事件响应函数，即该段时间内可能多次执行事件响应函数。

代码：

debounce简化源码
JavaScript
function debounce(delay, callback) {
  let timeoutID;
​
  function wrapper() {
    const self = this;
    const args = arguments;
​
    function exec() {
      callback.apply(self, args);
    }
​
    clearTimeout(timeoutID);
​
    timeoutID = setTimeout(exec, delay);
  }
​
  return wrapper;
}
throttle简化源码
JavaScript
function throttle(delay, callback) {
  let timeoutID;
  let lastExec = 0;
​
  function wrapper() {
    const self = this;
    const elapsed = Number(new Date()) - lastExec;
    const args = arguments;
​
    function exec() {
      lastExec = Number(new Date());
      callback.apply(self, args);
    }
​
    clearTimeout(timeoutID);
​
    if (elapsed > delay) {
      exec();
    } else {
      timeoutID = setTimeout(exec, delay - elapsed);
    }
  }
​
  return wrapper;
}
18 Promise
函数Promise化
JavaScript
const processFn = (fn) => function (...args) {
    return new Promise((resolve, reject) => {
       args.push((error, result) => {
           if (error) {
               reject(error);
           } else {
               resolve(result);
           }
       }); 
       fn.apply(this, args);
    });
};
对象Promise化
JavaScript
module.exports = (input) => {
    for (const key in input) {
    const property = input[key];
    ret[key] = typeof property === 'function' ? processFn(property) : property;
  }
}