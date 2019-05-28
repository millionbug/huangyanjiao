

typeScript
1.void 和 undefined 有什么区别？

在 TypeScirpt 中，可以用 void 表示没有任何返回值的函数;声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null.

undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null。

 

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量,而 void 类型的变量不能赋值给 number 类型的变量

2.什么是 never 类型？

never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

下面是一些返回never类型的函数：

// 返回never的函数必须存在无法达到的终点functionerror(message: string): never{
    thrownewError(message);
}

// 推断的返回值类型为neverfunctionfail( ) {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点functioninfiniteLoop( ): never{
    while (true) {
    }
}
3.下面代码会不会报错？怎么解决？
   const obj = {

    a: 1,
    b: 'string'
};
  
obj.c = null;
答：会报错,应改为

const obj:{

  a: number,

  b: string,

  c?: any

} = {

    a: 1,

    b: 'string',

};

 

obj.c = null;

4.readonly 和 const 有什么区别？

用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用const，若做为属性则使用readonly。

 

用 const 申明时必须离开初始化值，readonly 申明时可以立刻初始化值，也可以在构造函数中赋初始值。

 

const x;// Error:(1, 7) TS1155:'const' declarations must be initialized.

class Test {
readonly name: string;
 constructor(theName: string) {
this.name = theName;
 }
}
 

let test = new Test("people");
5.下面代码中，foo 的类型应该如何声明

   functionfoo (a: number) {

return a + 1;
}
 
foo.bar = 123;
答：

typefunc = (a: number) =>number;


interfacefuncXextendsfunc {

bar?: number

}


constfoo: funcX = (a) => {

returna + 1;

};


foo.bar = 123;

6.下面代码中，foo 的类型如何声明  

let foo = {};
  
for (let i = 0; i< 100; i++) {
    foo[String(i)] = i;
}
答：

interfaceFoo {

[index: string]: number;

}

letfoo:Foo = {};

for (leti = 0; i< 100; i++) {

foo[String(i)] = i;

}

7.实现MyInterface 

interface MyInterface {
    ...
}
class Bar implements MyInterface {
    constructor(public name: string) {}
}
class Foo implements MyInterface {
    constructor(public name: string) {}
}
  
functionmyfn(Klass: MyInterface, name: string) {
    returnnew Klass(name);
}
  
myfn(Bar);
myfn(Foo);
答：

interfaceMyInterface {

name: string;

}

interfaceMyConstructor {

new (name: string);

}

classBarimplementsMyInterface {

constructor(publicname: string) {}

}

classFooimplementsMyInterface {

constructor(publicname: string) {}

}

functionmyfn(Klass: MyConstructor, name?: string) {

returnnewKlass(name);

}

myfn(Bar);

myfn(Foo);

8.什么是 Abstract Class?

abstract 用于定义抽象类和其中的抽象方法。抽象类是不允许被实例化的,抽象类中的抽象方法必须被子类实现.

9.什么是Class Mixin?如何实现？

class mixin是指可以继承多个类的属性。但是mixin并不是通过传统的extends来实现的，而是通过implements来实现的，把待继承类当作接口，最终通过辅助函数拷贝待继承类里面的所有属性。

 
// Disposable Mixin

 
class Disposable {

 
    isDisposed: boolean;

 
    dispose() {

 
        this.isDisposed = true;

 
    }

 
 

 
}

 
 

 
// Activatable Mixin

 
class Activatable {

 
    isActive: boolean;

 
    activate() {

 
        this.isActive = true;

 
    }

 
    deactivate() {

 
        this.isActive = false;

 
    }

 
}

 
 

 
class SmartObject implements Disposable, Activatable {

 
    constructor() {

 
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);

 
    }

 
 

 
    interact() {

 
        this.activate();

 
    }

 
 

 
    // Disposable

 
    isDisposed: boolean = false;

 
    dispose: () => void;

 
    // Activatable

 
    isActive: boolean = false;

 
    activate: () => void;

 
    deactivate: () => void;

 
}

 
applyMixins(SmartObject, [Disposable, Activatable]);

 
 

 
let smartObj = new SmartObject();

 
setTimeout(() => smartObj.interact(), 1000);

 
 

 
////////////////////////////////////////

 
// In your runtime library somewhere

 
////////////////////////////////////////

 
 

 
function applyMixins(derivedCtor: any, baseCtors: any[]) {

 
    baseCtors.forEach(baseCtor => {

 
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {

 
            derivedCtor.prototype[name] = baseCtor.prototype[name];

 
        });

 
    });

 
}

10.typeof关键字的作用

    1、在js中typeof用于判断基本数据类型。

    2、在TypeScript中，typeof在判断数据类型的同时，直接提供了类型保护功能。

 

function ant(param: string | number) {

  if (typeof param === "number") {

    console.log(param+5);

  }

  if (typeof param === "string") {

    console.log(param+"hello wrold");

  }

}

  

原本是联合类型，由于应用了typeof，后面作用域的param就确定为number类型。

typeof类型保护只有两种形式能被识别：typeof v === "typename"和typeof v !== "typename"。

"typename"必须是"number"，"string"，"boolean"或"symbol"。 但是TypeScript并不会阻止与其它字符串比较，语言不会把那些表达式识别为类型保护。

 

  3、typeof关键字，当在表示类型的地方使用时，会得出一个类型值，这里就表示模块的类型。

   4、typeof 在编译期还可以获取某个变量的类型。比如：
      var a = 123;
      var b： typeof a  = 345;

11.keyof关键词有什么作用？

     1、查询索引类型

 

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {

  return names.map(n => o[n]);

}

 

interface Person {

    name: string;

    age: number;

}

let person: Person = {

    name: 'Jarid',

    age: 35

};

let strings: string[] = pluck(person, ['name']); // ok, string[]

 

      2、映射类型

 

interface Person {

    name: string;

    age: number;

}

  

变成可选属性

interface PersonPartial {

    name?: string;

    age?: number;

}

  

变成只读属性

interface PersonReadonly {

    readonly name: string;

    readonly age: number;

}

  

type Readonly<T> = {

    readonly [P in keyof T]: T[P];

}

type Partial<T> = {

    [P in keyof T]?: T[P];

}

  

type PersonPartial = Partial<Person>;

type ReadonlyPerson = Readonly<Person>;


12.下面代码中，foo 的类型如何声明

functionfn(value: number): string{
    returnString(value);
}
const foo = fn;
答：type Foo = (value: number) => string;

 

functionfn(value: number): string{
    returnString(value);
}
const foo : Foo= fn;
 

13.下面代码会导致 TS 编译失败，如何修改 getValue 的类型声明。

functiongetValue( ) {
    returnthis.value;
}
  
getValue();
答：可以编译通过，TypeScript 版本 2.6.1。



14.下面是 vue-class-component 的部分代码，解释为什么会有多个 Component 函数的声明，作用是什么？TS 官方文档的那一节有对应的解释文档？ 

functionComponent <UextendsVue>(options: ComponentOptions<U>): <VextendsVueClass>(target: V) => VfunctionComponent <VextendsVueClass>(target: V): VfunctionComponent <VextendsVueClass, UextendsVue>( options: ComponentOptions<U> | V ): any{ if (typeof options === 'function') {
    returncomponentFactory(options)
  }
  returnfunction (Component: V) {
    returncomponentFactory(Component, options)
  }
}
答：重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。



15.如何声明 foo 的类型？

 

  const foo = new Map();

foo.set('bar', 1);
答：const foo: Map<string, number> = new Map();

foo.set('bar', 1);
 

16.如何声明 getProperty，以便能检查出第八行将会出现的运行错误。   

functiongetProperty(obj, key) {
    return obj[key].toString();
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");
答：利用泛型

function getProperty<T>(obj: T, key: keyof T) {

    return obj[key].toString();

}

 

let x = { a: 1, b: 2, c: 3, d: 4 };

 

getProperty(x, "a");

getProperty(x, "m");

17.类型声明里 「&」和「|」有什么作用？

&：表示交叉类型，多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

|：表示联合类型，联合类型表示一个值可以是几种类型之一

// x 需要实现 eat 和 drive 方法
let x: Cat & Car;

// y 只需要需要实现 eat 和 drive 中的至少一个方法即可
let y: Cat | Car;



18.下面代码里「date is Date」有什么作用？ 

 

functionisDate(date: any): dateisDate{
  if (!date) returnfalse;
  returnObject.prototype.toString.call(date) === '[object Date]';
}
 

 

答：类型保护：假如检查过类型，就能在之后的分支里知道当前类型。

 

19.tsconfig.json 里 --strictNullChecks 参数的作用是什么？

答：开启strictNullChecks切换到新的严格空检查模式后，null和undefined值不再属于任何类型的值，仅仅属于它们自己类型和any类型的值 （还有一个例外， undefined也能赋值给void）。

 

20.interface 和 type 声明有什么区别？

   1、interface 只能定义对象类型， type 声明的方式可以定义组合类型，交叉类型，原始类型。

   2、interface 方式可以实现接口的 extends 和 implements ， 而 type alias 则不行。

   3、interface 可以实现接口的 merge ，但 type alias 则不行

 

21.如何完善 Calculator 的声明。

   interface Calculator {

    ...
}
 
let calcu: Calculator;
calcu(2)
  .multiply(5)
  .add(1)
答：

interface Calculator {

    (num: number):  Calculator,

  multiply: (num: number) => Calculator,

  add: (num: number) => Calculator

}

22.「import ... from」、「 import ... = require()」 和 「import(path: string)」有什么区别？

   
    1、import ... from:  es6的引入模块的规范。

    2、import ... = require()：若要导入一个使用了export =的模块时，必须使用TypeScript提供的特定语法import module = require("module")。

    3、import(path: string)：一些模块会设置一些全局状态供其它模块使用。 这些模块可能没有任何的导出或用户根本就不关注它的导出。这时我们就用这样的方式引入。



23.declare 关键字有什么用？

    1、declare可以用来声明全局变量。

     使用declare var声明变量。

     如果变量是只读的，那么可以使用 declare const。

     你还可以使用 declare let如果变量拥有块级作用域。

   2、使用declare function声明全局函数。

   3、使用declare namespace描述用点表示法访问的类型或值。

   4、使用declare class描述一个类或像类一样的对象。

 

24.module 关键字有什么用？

过去 TypeScript1.5之前， module 关键字既可以定义 "内部模块", 也可以定义 "外部模块"; "内部模块" 的概念更接近于大部分人眼中的命名空间; 而 "外部模块" 对于 JS 来讲, 现在也就是模块了.
1.5之后的版本，推荐使用namespace，因为JS里本身就有module的概念，而且已经是ES6标准里的关键字，各种加载框架比如CommonJS，AMD等也都有module的概念，但是TS里之前的module关键字与他们都不太相同。

 

25.如何处理才能在 TS 中引用 CSS 或者 图片使之不报错？

import"./index.scss";
import imgPath from"./home.png";
答：

import "./index.scss";

是不会报错的，可以直接这样写，只需要在 Webpack 中加上 sass-loader

import imgPath from "./home.png";

会报错，可以这样写：

const imgPath = require("./home.png");
再在Webpack 中加上 file-loader



26.编写 d.ts 来声明下面的 js 文件 

 

class Foo {
}
module.exports = Foo;
module.exports.Bar = 1;
 

答：

declare namespace myFoo {

 

    export class Foo {}

 

    export var Bar: 1;

 

}

27.namespace 和 module 有什么区别

TS里的namespace是跨文件的，JS里的module是以文件为单位的，一个文件一个module。

namespace的概念等同于包名，module的概念等同于文件。

TS里的namespace主要是解决命名冲突的问题，会在全局生成一个对象，定义在namespace内部的类都要通过这个对象的属性访问，例如 egret.DisplayObject,egret就是namespace的对象，DisplayObject则是那个类名。因为是注册到全局的，所以跨文件也能正常使用，不同的文件能够读取其他文件注册在全局的命名空间内的信息，也可以注册自己的。namespace其实比较像其他面向对象编程语言里包名的概念。

 

28.如何实现 module alias?编译成 JS 能否直接运行？ 

import Bar from '@src/Bar';
答：

{

  "compilerOptions": {

    "baseUrl": ".",

    "paths": {

      "@src/*": ["./src/*"]

    }

  }

}

29.哪些声明类型既可以当做 type 也可以当做 value？

null，undefined，class，Enum

 

