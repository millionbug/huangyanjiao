TypeScript问题解答


void 和 undefined 有什么区别？

void 的含义是没有值，通常用于没有返回值的函数。
```javascript
function hi( ): void {
}
```

void 类型的变量只能被赋值为 null 和 undefined.
```javascript
let unusable: void = undefined;
let unusable: void = null;

```

void 和 undefined 的区别在于 undefined 是 JavaScript 语言的原生基本类型之一，而 void 是 TypeScript 引入的辅助类型。

什么是 never 类型？
never 类型是指永远不会返回的类型，用于永远不会有返回的函数
```javascript
// 肯定会抛出异常的函数，不会直接返回
function error(message: string): never {
throw new Error(message);
}
```

```javascript
// 间接的返回不会返回的函数
function fail() {
return error("Something failed");
}
```

```javascript
// 进入了无限循环，无法退出，由于不会返回
function infiniteLoop(): never {
while (true) {
    }
}
```

下面代码会不会报错？怎么解决？
 
```javascript
const obj = {

    a: 1,

    b: 'string',

};
obj.c = null;
```

报错：Error:(6, 5) TS2339:Property 'c' does not exist on type '{ a: number; b: string; }'.

解决方法是指出 obj 的类型接口：
```javascript
const obj: {
a: number,
 b: string,
 c?: any,
} = {
a: 1,
 b: 'string',
};

obj.c = null;
```

readonly 和 const 有什么区别？
readonly 和 const 都是用于表面静态类型的变量，区别在于：

const 是 JavaScript 原生自带的申明语法，readonly 是 TypeScript 特有的。

用 const 申明时必须离开初始化值，readonly 申明时可以立刻初始化值，也可以在构造函数中赋初始值。

```javascript
const x;// Error:(1, 7) TS1155:'const' declarations must be initialized.

class Octopus {
readonly name: string;
 readonly numberOfLegs: number = 8;

 constructor(theName: string) {
this.name = theName;
 }
}

let dad = new Octopus("Man with the 8 strong legs");
```
下面代码中，foo 的类型应该如何声明
 
```javascript
function foo (a: number) {
    return a + 1;
}

foo.bar = 123;

type func = (a: number) => number;

interface funcXextends func {
bar?: number
}

const foo: funcX = (a) => {
return a + 1;
};

foo.bar = 123;
下面代码中，foo 的类型如何声明
 

let foo = {};

  

for (let i = 0; i< 100; i++) {

    foo[String(i)] = i;

}


let foo: { [key: string]: number } = {};
```
实现 MyInterface
 
```javascript
interface MyInterface {

    ...

}

class Bar implements MyInterface {

    constructor(public name: string) {}

}

class Foo implements MyInterface {

    constructor(public name: string) {}

}

  

function myfn(Klass: MyInterface, name: string) {

    return new Klass(name);

}

  

myfn(Bar);

myfn(Foo);
```
 

什么是 Abstract Class？
Abstract Class 是指无法被实例化的基类，只有基层的它的子类可以被实例化。

```javascript
abstract class Animal {
abstract makeSound(): void;
}

class Cat extends Animal {
makeSound() {
        console.log('miao~');
 }
}

let cat = new Cat();
cat.makeSound();
```

什么是 class mixin, 如何实现？
class mixin 是指混合类，把公用的组件类混合到其他类中，实现如下：

// 可复用类 Disposable
class Disposable {
isDisposed: boolean;

 dispose() {
this.isDisposed = true;
 }

}

// 可复用类 Activatable
class Activatable {
isActive: boolean;

 activate() {
this.isActive = true;
 }

deactivate() {
this.isActive = false;
 }
}

// SmartObject 需要实现 Disposable, Activatable 的接口
class SmartObject implements Disposable, Activatable {
// SmartObject 类自己的逻辑
 constructor() {
setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
 }

interact() {
this.activate();
 }

// 申明可复用类的接口
 // Disposable
 isDisposed: boolean = false;
 dispose: () => void;
 // Activatable
 isActive: boolean = false;
 activate: () => void;
 deactivate: () => void;
}

/**
 * 实现类的混合
 * @param derivedCtor 目标类
 * @param {any[]} baseCtors 可复用类
 */
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
 })
    });
}

// 把 Disposable, Activatable 混合到 SmartObject 上
applyMixins(SmartObject, [Disposable, Activatable]);

var smartObj = new SmartObject();



typeof 关键词有什么用？

 当变量不定时，typeof 用于判断变量类型，例如：

let x: any;

x = 1;
console.log(typeof x);

x = '1';
console.log(typeof x);


keyof 关键词有什么用？

 
keyof是索引类型查询操作符。


假设T是一个类型，那么keyof T产生的类型是T的属性名称字符串字面量类型构成的联合类型。


如果T是一个带有字符串索引签名的类型，那么keyof T是string类型，并且T[string]为索引签名的类型。

下面代码中，foo 的类型如何声明
 

function fn(value: number): string {

    return String(value);

}

const foo = fn;

const foo: (value: number) => string = fn;

下面代码会导致 TS 编译失败，如何修改 getValue 的类型声明。
 

function getValue() {

    return this.value;

}

  

getValue();

我试了可以编译通过，TypeScript 版本 2.5.2。

 

下面是 vue-class-component 的部分代码，解释为什么会有多个 Component 函数的声明，作用是什么？TS 官方文档的那一节有对应的解释文档？
 

function Component <U extends Vue>(options: ComponentOptions<U>): <V extends VueClass>(target: V) => V

function Component <V extends VueClass>(target: V): V

function Component <V extends VueClass, U extends Vue>(

 options: ComponentOptions<U> | V

): any {

  if (typeof options === 'function') {

    return componentFactory(options)

  }

  return function (Component: V) {

    return componentFactory(Component, options)

  }

}

这是函数重载，重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。官方文档 https://www.typescriptlang.org/docs/handbook/functions.html 最底部。

 

如何声明 foo 的类型？
 

const foo = new Map();

foo.set('bar', 1);

 

const foo: Map<string, number> = new Map();
foo.set('bar', 1);
 

如何声明 getProperty，以便能检查出第八行将会出现的运行错误。
 

1

2

3

4

5

6

7

8

function getProperty(obj, key) {

    return obj[key].toString();

}

 

let x = { a: 1, b: 2, c: 3, d: 4 };

 

getProperty(x, "a");

getProperty(x, "m");

利用字符串枚举类型，见官方文档 https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#string-literal-types

function getProperty(obj, key: 'a' | 'b' | 'c' | 'd') {
return obj[key].toString();
}
 

 

类型声明里 「&」和「|」有什么作用？
& 代表且的关系，即需要同时符合几个类型。

| 代表或的关系，即只需要符合其中一个类型即可。

 

interface Cat {
eat();
}

interface Car {
drive();
}

// x 需要实现 eat 和 drive 方法
let x: Cat & Car;

// y 只需要需要实现 eat 和 drive 中的至少一个方法即可
let y: Cat | Car;
下面代码里「date is Date」有什么作用？
 

function isDate(date: any): date is Date {

  if (!date) return false;

  return Object.prototype.toString.call(date) === '[object Date]';

}

类型保护：假如检查过类型，就能在之后的分支里知道当前类型。

function isDate(date: Date | string): date is Date {
if (!date) return false;
 return Object.prototype.toString.call(date) === '[object Date]';
}

let date = '123';

if (isDate(date)) {
// 这里明确了 date 就是 Date 类型的
 date.getDate();
} else {
// 这里明确了 date 就是 string 类型的
 date.length;
}
 

见官方文档 https://www.typescriptlang.org/docs/handbook/advanced-types.html User-Defined Type Guards

 

tsconfig.json 里 --strictNullChecks 参数的作用是什么？
在TypeScript中，null和undefined也是基本类型，以前类型检查器认为null和undefined可以赋值给一切。

开启strictNullChecks切换到新的严格空检查模式后，null和undefined值不再属于任何类型的值，仅仅属于它们自己类型和any类型的值 （还有一个例外， undefined也能赋值给void）。

 

// 使用--strictNullChecks参数进行编译的
let x: number;
let y: number | undefined;
let z: number | null | undefined;
x = 1; // 正确
y = 1; // 正确
z = 1; // 正确
x = undefined; // 错误
y = undefined; // 正确
z = undefined; // 正确
x = null; // 错误
y = null; // 错误
z = null; // 正确
x = y; // 错误
x = z; // 错误
y = x; // 正确
y = z; // 错误
z = x; // 正确
z = y; // 正确
 
 

 

interface 和 type 声明有什么区别？
不同于 interface 只能定义对象类型， type 声明的方式可以定义组合类型，交叉类型，原始类型。

interface 方式可以实现接口的 extends 和 implements ， 而 type alias 则不行。

interface 可以实现接口的 merge ，但 type alias 则不行。



 



 

如何完善 Calculator 的声明。
 

 

interface Calculator {

    ...

}

 

let calcu: Calculator;

calcu(2)

  .multiply(5)

  .add(1)

 

interface Calculator extends Function {
multiply(x: number): Calculator;
  add(x: number): Calculator;
}
「import ... from」、「 import ... = require()」 和 「import(path: string)」有什么区别？
// 使用 CommonJS 规范导入 fs 模块，并且使用它
import fs = require('fs');
// 使用 ES6 模块化导入 fs 模块，并且使用它
import fs from 'fs';
// 只是导入但是没有引用 fs
import 'fs';

declare 关键字有什么用？
declare 用于申明不是用 TypeScript 写的变量。由于大多数第三发模块都不是采用 TypeScript 编写而是 JavaScript，

在 TypeScript 源码中使用 JavaScript 编写的模块时，就需要通过 declare 去定义 JavaScript 编写变量，才能使得 TypeScript 源码编译通过。

module 关键字有什么用？
首先尽量不要在 TypeScript 中使用 module 关键字，因为 module 是在 ES6 模块化出来之前 TypeScript 搞的模块化语法，现在 ES6 已经出了一套标准的模块化语法，

在 TypeScript 中就尽量使用 import export 等 ES6 的模块化语法。

 

 

namespace 和 module 有什么区别
TS里的namespace是跨文件的，JS里的module是以文件为单位的，一个文件一个module。

namespace的概念等同于包名，module的概念等同于文件。

TS里的namespace主要是解决命名冲突的问题，会在全局生成一个对象，定义在namespace内部的类都要通过这个对象的属性访问，例如 egret.DisplayObject,egret就是namespace的对象，DisplayObject则是那个类名。因为是注册到全局的，所以跨文件也能正常使用，不同的文件能够读取其他文件注册在全局的命名空间内的信息，也可以注册自己的。namespace其实比较像其他面向对象编程语言里包名的概念。

module 关键字已经废弃，请使用 ES6 模块化语法代替。

 

 

如何处理才能在 TS 中引用 CSS 或者 图片使之不报错？
 

 

import "./index.scss";

import imgPath from "./home.png";

 

import "./index.scss";

是不会报错的，可以直接这样写，只需要在 Webpack 中加上 sass-loader

 

import imgPath from "./home.png";

会报错，可以这样写：

const imgPath = require("./home.png");
再在Webpack 中加上 file-loader



 

 

编写 d.ts 来声明下面的 js 文件
 

 

class Foo {

}

module.exports = Foo;

module.exports.Bar = 1;

 

 

export default class App {
}
export declare const Bar = 1;

如何实现 module alias?编译成 JS 能否直接运行？
 

import Bar from '@src/Bar';

使用 Path mapping，官方文档见 https://www.typescriptlang.org/docs/handbook/module-resolution.html

 

{
"compilerOptions": {
  "paths": {
"@src/*": "path/to/src"
  }
  },
}
 

 

哪些声明类型既可以当做 type 也可以当做 value？


枚举类型：

enum Color {Red, Green, Blue}
let x = Color.Red;
 

null类型：

let x = null;
 

undefined类型：

let x = undefined;
 
