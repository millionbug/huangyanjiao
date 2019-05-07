工作台发现
新功 能
搜索文档/空间
您好，杨国栋
头像
目录移动大前端（2019年1月刊）



美团点评移动研发/《移动大前端》月刊/移动大前端（2019年1月刊）



移动大前端（2019年1月刊）

C-3创建:周辉, 最后修改: 周辉02-01 13:19
本期主编：@洪磊  助理主编：@关育新 @Joy @段少鹏 


*【杂志封面】制作：@李腾 

目录
前言
专栏：Picasso 动态化技术
Picasso JS包体缩减探索
背景
为什么变大
如何消除无用代码
缩减效果
专栏：MRN 动态化技术
十分钟读懂 MRN 分包
引言
背景信息对齐
前人经验学习
MRN 的分包
分包加载
当前效果
未来优化
专栏：Web 开发技术
Roo袋鼠UI架构设计概览与简介
背景
设计理念
系统架构
组件质量
组件接入
交流共建
Iconfont 版本化图标字体平台
背景
整体设计
功能特性
开始使用
TypeScript赋能，提高已有Vue项目的含金量
一、前言
二、环境配置
三、*.vue文件的TS改造
四、如何编写类型声明文件
五、实践中遇到的问题
六、总结
七、附录
专栏：移动 开发技术
iOS 应用的后台启动能力
背景
生命周期
后台启动的方式
相同与不同
启动优化的新维度
注意事项
总结
iOS使用工具与策略优化组件发版时间
背景
工具
标准优化步骤
总结
行业前沿
  [译] W3C候选规范：Pointer Events 触点事件
概述
介绍
例子
术语解释
Pointer 事件和接口
Pointer Event types 触点事件类型
对 Element 接口的扩展
对 GlobalEventHandlers 接口的扩展
对 Navigator 接口的扩展
默认触摸行为的候选区域声明
Pointer Capture 触摸捕获
联系我们

前言
本期主编：@洪磊 

再有不到 7 天，即将迎来 2019 农历新年，伴着新年的气氛，让我们一起收获年前最后一波干货。

本期的主题将围绕“无边界”展开，新的一年给自己新的期待。

一个不设限的人生，一个没有狭隘标签的人设，需要主动打破自己的界限，不断的探寻新的领域和边界。

不谋全局者不足以谋一域，技术也当如此，需要从不同的视角和出发点持续的探索和实践更优雅的解决方案。

站在大前端角度，如何考虑跨平台方案的设计；站在设备碎片化的角度，如何考虑图标应用的更佳方式；站在精益的角度，如何从过往技术中沉淀出最佳实践；站在当下，如何面对未来技术趋势的冲击。本期我们将为大家呈现众多此类思考中的佼佼者，尽请一览。

关于缺少人物专访的说明

抱歉这期没有让大家看到激动人心的人物专访。由于时间关系，人物专访没能如期出炉，但是我们又希望尽早让大家看到本期的期刊内容，恳请大家见谅本期人物专栏的缺席。

后续我们会恢复人物采访专栏。本期我们准备了大量的文章，其中还包括一些之前不曾涉及的领域，希望能够让大家都看到自己喜欢的内容。

最后，祝所有期刊的读者 2019 新年快乐！来年再创佳绩


专栏：Picasso 动态化技术
Picasso JS包体缩减探索
作者：  @夏志迪  @张迎 


背景
随着Picasso在集团内部的应用越发广泛，各个业务对基础npm库的抽象优化越来越多。最近一些业务反馈自己的Picasso代码只是引入了一个npm包，但是包体却异常增大很多，令人苦恼。

我们组织了专项的调研，并最终整理了一些包体缩减实践，本文将简要进行探讨。

为什么变大
包体变大的原因要从Picasso的JS构建过程说起。Picasso的构建过程可以概括为：

编写TypeScript业务源码

import { ** } from "@dp/picasso-xxx" 引入各种所需npm包的功能

TypeScript转JavaScript

Rollup将源码所依赖的npm代码打包在一起

产生最终bundle js

经过分析，正是第4步将所引用的npm包里实际没有使用到的代码打包进了最终的bundle js中，从而引起了包体异常增大。为什么会将没有使用的代码打进bundle js中呢？

大部分Picasso npm的书写习惯会暴露一个统一的index.js供npm统一对外。index.js的内容基本如下：


红色框框中的模块都是class，会作为一个整体，形成一个function被export出去。业务代码在import这个npm的功能时候，这些实际可能没有用到的代码都被打进了bundle js中。

如何消除无用代码
那么如何消除无用代码？无用代码消除广泛存在于传统的编程语言编译器中，编译器可以判断出某些代码根本不影响输出，然后消除这些代码，这个过程称之为DCE（dead code elimination）。

Rollup本身支持一种DCE的实现——Tree shaking。那为什么Picasso的Rollup过程没有激活Tree shaking，从而消除无用代码呢？

原因在于Tree shaking的原理是基于ES6 Module。虽然Picasso的项目工程架构已经广泛应用了ES6 中Module的概念，但是无论是npm包本身还是TypeScript源码的编译目标均还是ES5。

之所以Picasso使用ES5，主要是因为iOS9系统对ES6完全不支持，考虑到设备兼容性问题，一直没有升级ES6。

但是为了消除无用代码，进一步推进Picasso JS包体的缩减，我们决定全面拥抱ES6，并在构建过程的最后一步加入兼容性ES5适配步骤，以保证bundle js的安全可靠。

我们的总体构思如下：


项目结构优化

对于Picasso的开发者来说项目结构主要有两点变化：

1、npm的和业务项目的target目标均修改为ES6 (ES2015)

2、业务项目新增一个es5编译步骤（可选，建议）

因es5的兼容性编译步骤会在Picasso CI发布流程统一处理，故开发者可以自行决定是否在自己的本地业务项目内加入这一构建步骤。如果不加入，本地开发时将无法在iOS9的设备中进行liveload。

代码书写优化

除了项目结构的优化，对于日常代码的书写也需要有一些优化：

1、枚举类型使用export const修饰

2、减小export的代码块粒度，尽可能的使用基础的export function

3、Picasso Model使用最新版Babel重新生成

具体的实施步骤请参考：Picasso JS 包体缩减方案

缩减效果
近期，我们在点评首页的Feed项目做了缩减试点，在只ES6化了部分基础npm包的情况下，Feed项目的Picasso JS包体缩减率已经达到了75%。

Bundle

旧（k）

新（k）

缩减比

Advertisement-bundle.js	

99.8

23.1

76.85%

Common-bundle.js

102.4

19.9

80.57%

Content-bundle.js

145.7

43.7

70.01%

Operation-bundle.js

99.8

22.5

77.45%

Rank-bundle.js

145.4

37.8

74.00%

Special-bundle.js

99.8

24.8

75.15%

合计

692.9

171.8

75.21%

Feed项目的缩减还在继续推进，更多项目的缩减统计请参考：Picasso包体缩减效果（即时更新）

Picasso所有的基础npm包将在近期逐步发布ES6优化后的更新版本，我们也盛情邀请各个Picasso业务方参与进来，将业务npm进行上述优化，从而减小Picasso JS包体大小，为业务性能的进一步提升助力。

Picasso JS包体缩减相关问题、意见、建议，请随时在Picasso大象大群留言，或直接联系@夏志迪 。


专栏：MRN 动态化技术
十分钟读懂 MRN 分包
作者：@安成健 

引言
在我们做 MRN 之前，其实 RN 已经诞生了三年，在业内基于 RN 已经有成熟的大规模使用案例，诸如：CRN、QRN、JDReact 等。

RN 官方的用法是一个应用一个 JSBundle（包含了当前 RN 模块的所有 JS 代码），如果存在多个 RN 模块需要被加载时，就需要分别打出多个 JSBundle。多个 JSBundle 之间有许多重复的代码（例如：第三方依赖），造成了带宽流量和 APP 缓存空间的浪费。分包就是将其中重复代码提取成公共包，有助于降低内存的占用，减少加载时间，节省更新时流量带宽等。

本文将带领大家一起探究 MRN 的分包设计，主要从分包构建和分包加载两个方面进行讲解。

背景信息对齐
首先同步几个背景信息。

包和打包

打包是把工程中的一堆 JS 和资源文件编译在一起，编译的结果就是包。

JSBundle 是若干个 JS 模块通过一个模块化 polyfill 拼合在一起的一个大 JS 文件，再叠加上各种素材资源文件（比如 png、jpg 等等）再压缩在一起就叫做包，所以最终的呈现的包就是一个 zip 文件。


在前端圈有各种各样的打包工具，比如 webpack、rollup、gulp、grunt 等等，枚不胜数。RN 打包用的是 FB 实现的一套工具，叫做 Metro，而我们 MRN 打包工具的选型是  webpack，原因主要是：

扩展功能更加方便，更适合 MRN 需要较多自定义能力（分包等）的场景；

团队成员有丰富的 webpack 经验，对 metro 的源码了解甚少；

webpack 的扩展丰富、社区强大，影响力更大；

已有行业内大公司和社区 haul 的成功实践。

JSBundle

对于完全不了解 JS 模块化的朋友需要先阅读理解 前端模块化详解(完整版) ，了解前端的模块化后，下面我们进行 JSBundle 的科普。


整个 JSBundle 可以分为三大块：

第一块是头部文件 polyfills，约等于那个闭包函数，为 JS 解释器注入一些关键字和模块化的功能；

第二块是模块申明，就是调用闭包的那一个对象，key 就是 moduleID，value 就是我们的一个个 JS 模块；

第三块是模块的调用，在此图中就是闭包函数末尾的那一行自启动方法（启动入口）；实际上，除了自启动方法，还有一个是分包加载器 webpackChunk 的方法，它用于分包加载时候的模块注入和模块启动。

RN 中所有的 JSBundle 是运行在 JSCore 中（iOS 为系统自带的，Android 是 RN 编译预置到 APP 中），更多的一些资料，可以参考 深入理解JSCore 。

前人经验学习
分包并不是 MRN 团队首创，社区和业界早已有探索方案，我们在动手之前，认真的学习调研了一下，目前业界大致有两种分包思路。

基于 Diff 的分包

RN 的启动方式有两种，第一种是我们最常见到的，基于整包（也就是离线包）的加载运行方法，这种方法在我们做 RN 和  Native 混合开发的时候改动最小，接入也最简单。

对于这种整包，RN 提供了一个打包的方法:

代码块
Shell
$ react-native bundle --entry-file index.js --bundle-output 'dist/main.jsbundle' --platform ios --dev false --assets-dest dist
​
Diff 分包思路整体为三大步：

第一步，先准备一个空的 index.js 的文件，里面只做一个操作，import 那些基础的依赖：

代码块
JavaScript
import React from 'react'
import ReactNative from 'react-native'
export default { React, ReactNative }
​
打出一个包，把它叫做 CommonBundle。

第二步，再把真正的业务代码打一个包出来，把它叫做 BizBundle，如图所示：


第三步，每次都将 BizBundle 与这个 CommonBundle 进行 file diff ，最后那个公共的部分就预置或者提前下发到用户的手机上，每次业务更新只下发 BizPatch 文件即可，在运行 RN 页面的时候，直接拼合 DiffCommon + BizPatch 就是一个完整的 Bundle ，在 load 到 JSCore 中运行起来就可以啦。

这么做确实能节省包大小，节省下载流量带宽，但是 DiffCommon 注定是一个「无意义」的残缺 JS ，不能直接运行起来，也意味着我们不能做预初始化等深度的性能优化。

基于 Unbundle 的分包

RN 不仅提供了整包的加载运行方法，还提供了一个 file-ram-bundle 的加载运行方法，简称为 Unbundle 方法。简单点说，就是将所有的 JS 模块都拆分成独立的文件，通过 JS require JS 的方式进行加载执行。更简单的说，就是类似于把我们整个工程的 xxx.js 全部下发到用户的手机磁盘中。

接下来就有很巧妙的操作了，把 react/react-native 这俩 Base 依赖的 JS 模块全部提取出来，标记到一个配置文件中。紧接着把这部分公共的 JS 模块预置或提前下发到手机上，然后每次下发业务的代码时候，就只用下发剩下的 JS 模块。如图所示：


这既解决了分包的问题，也是一个「有意义」的包，可以用来做一些预初始化等的优化操作，但是它也带来了一个新的问题：由于碎文件过多而导致 IO 性能问题。在手机磁盘上，IO 操作可是一个非常金贵的操作，如遇到低端手机（如 SD 卡）消耗更是巨大，之后携程又做了对应的一些优化措施，比如把模块按照 moduleID 聚合，尽可能的聚合成几个大的 JSBundle。

总而言之，有两点不足：分包的成本较高，性能有影响。

MRN 的分包
MRN 的分包吸取了前面两种分包方法的优点，既要用整包的方式去分包，又要是「有意义」的包，能做预初始化。

多层分包

此前的分包都是只做了两层分包，但我们的业务又多又大，每一个业务线，每一个 BG 可能所习惯的技术栈都不一样，这时候，除了让 react/react-native 这种基础库可以分包外，还得让业务内部，BG 内部有分包的能力，在以后大家做精细化的包大小管控的时候才能不被束缚住手脚。为此，我们做了多层分包。


MRN 层面，只拆分最基本的 react/react-native/redux 这种基础依赖，其余的依赖由业务方自行拆分操作，详细拆分可以参考 前端拆包分层 。

分包构建的配置

同时，我们不能每次都手动摘取 common 的依赖内容进行分包，我们必须得要一个简明的方法去记录要剥离的模块。为此，我们在 mrn.config.js 中做了一个 bundleDependencies 的字段，参见 mrn.config.js的详细配置项


这个字段里的标记的是 npm 依赖，在每次 build 编译打包的时候根据这个配置进行分包操作。

构建过程

几乎所有前端的编译打包工具都是一个大的思路：从入口文件开始，解析文件内容成一个 AST（抽象语法树） ，再从 AST 中识别出 import/require 的内容，再逐一递归的解析、读取，最终会形成一颗模块树，也是依赖关系树（其实是依赖关系网）。

     =>    

然后 MRN 分包插件会读取 mrn.config.js 中的 bundleDependencies 所对应的依赖中 dist/mrn.publish.json 配置文件，最终聚合成一个要被清洗剥离的模块列表。

此时有一个注意点：dist/mrn.publish.json 是编译时自动生成的，它里面记录了当前子包中所有的 moduleID，需要每次都发布到 npm 给主包使用。

最后剥离完成后就是一个仅含业务代码的依赖关系树了，此时再将剩下的这些 JS 模块文件，打包编译成一个 JSBundle。


这里需要说明一下的，除了 JSBundle ，还要把 import/require 的资源 copy 到我们的包体中，以确保离线素材不丢失，页面完整。

这一切做完后，MRN 还加了一个包信息的配置文件 meta.json 到包体中，数据结构如下：

代码块
JavaScript
{
  "name": "rn_hotel_poiList",
  "biz": "hotel",
  "bundleType": 1,
  "version": "0.0.1",
  "dependencies": [{
      "name": "rn_hotel_hotel-common",
      "version": "0.1.0"
  }],
  "timestamp": "1535949921016"
}
​
至此，我们的包已经编译出来了，最终完整的包体如下：


可能有同学会问，以前是一个完整 JSBundle ，现在拆分成了 n 个 JSBundle 的片段，这样怎么运行起来的呢？

不着急，我们接下来讲分包加载。

分包加载
分包加载是一个客户端的流程，里面有些客户端的概念，我尽量讲的抽象和简单一些，也便于前端的同学阅读。

同时这里略过包的分发下载，假设包已经被下载到了手机磁盘中了。

MRN Scheme URL

我们的 APP 并不是一个完全的 RN 应用，在混合开发的过程中，需要通过路由来区分当前页面是否是一个 MRN 的页面。

所有的 MRN 页面都会有一个统一的 path（当然这个 path 是可以自定义），后面 query 参数再传递一些具体的页面信息。

这是一个典型的跳链：imeituan://www.meituan.com/mrn?mrn_biz=hotel&mrn_entry=poiList&mrn_component=mrnproject&paramsA=xxxx&paramsB=xxxx

分别解释一下各个 query 参数的意义：

mrn_biz：所属的业务线，来源于 mrn.config.js 中的 biz 字段；

mrn_entry：bundle的文件名，来源于 mrn.config.js 中的 name 字段；

mrn_component：bundle中对应的组件名，来源于入口文件 index.tsx 中的 AppRegistry.registerComponent 的组件名；

其他参数：转成 initialProperties 传递给 RN 页面。

加载过程

整个加载过程可以分为 解析参数 => 启动容器 => 加载 Loading => 取 Bundle => 启动引擎 => 渲染 => 关闭 Loading 这个几个关键步骤。

进入 MRN 页面的时候，Native 的路由拦截到跳链中的 path 为 "/mrn" 后，会启动一个 MRN 的容器，用容器名匹配开启具体哪个 Activity 或 VC。


然后根据跳链参数中的 biz 和 entry 参数拼接路径 '<app_root>/mrn-bundle/rn_' + biz + '_' + entry 去包解压后的文件夹中找业务主包，如果此时在手机磁盘里有多个主包，则打开最高版本的主包。

找到主包之后会读取 meta.json ，分析其中 dependencies 是否有子包依赖，如果有依赖，则拼接路径 '<app_root>/mrn-bundle/' + name + '_v' + version 打开指定的子包，最后将所有的子包及主包的 index.js 读取出来。

拿到 Bundle 之后，会开始取引擎，引擎有两个来源：

预初始化的引擎：在 APP 的首屏启动后，进入 MRN 的业务前，从预置 Bundle 目录中取出 MRN Base 和 MRN Common 包，以子线程的方式初始化 1 个引擎。

同业务复用的引擎：MRN 页面关闭后并不会立即销毁引擎，在销毁之前再次进入，则直接复用之前的引擎。

取到引擎后，不复用则把 JSBundle Load 到引擎。

最后进行渲染，整个 MRN 的分包加载完成。

当前效果
从当前的业务规模来看，分包的收益是巨大的：

以美团 APP 在 20190114 为例，每天节省的 CDN 带宽流量约 82.1 TB，计算公式: R = ( n - b - c ) * ( bs + cs ) ；

以当前线上的 121 个包为例，能为每一个美团 APP 用户节约手机磁盘约 31 MB，计算公式: R = ( m - 2) * ( bs + cs ) ；

配合 FakeApp 及预初始化能提升 RN 页面启动性能 60%，数据源于 MRN Benchmark 的测算。

计算公式注：

    n 为总 Bundle 下载次数: 330681687

    m 线上业务包总数：121

    b 为 MRN Base 下载次数: 1479

    c 为 MRN Common 下载次: 18953

    bs 为 MRN Base Size 包大小： 189 KB

    cs 为 MRN Common Size 包大小：77.4 KB

未来优化
当然现阶段的分包也并不是完美无暇，在一些细节的处理上还有很多可优化的地方，目前看起来的不足有这么几点：

一是，目前 MRN 在 tree-shaking、polyfills、moduleID 等地方做的还不够好，Bundle 的体积还有可优化的空间，更多资料参考：MRN 的 Bundle 体积优化。

二是，目前我们目前每次都是整包下载，几行代码改动也会下载整个包，造成流量的浪费，后续会优化为增量更新。

无论如何，在未来我们会持续优化，生产出更加精简的包，优化打开速度和性能，让 MRN 的页面比肩 Native，提升用户体验。

MRN 客户大象群

欢迎大家加入MRN客户群，大家在实践应用过程中，有任何问题都可以反馈，一起学习交流。



专栏：Web 开发技术
Roo袋鼠UI架构设计概览与简介
作者 @马冰冰 

背景
历史

Roo（袋鼠 UI）是外卖技术部和 MTUX 2016年初联合发起、全力打造的一款前端组件库，致力于设计、技术、产品等多角色的人效和质量提升的控件平台。

2016年发起时，由于外卖大部分项目使用 jQuery 和 RequireJS 开发，先提供了 jQuery（PC）版，应用于外卖、快驴、闪购等30+项目。后续随着 React（RN）、Vue 等框架的广泛应用，袋鼠 UI 逐步推出了 PC（React、Vue）和移动端（React、Vue、RN）等系列组件库，并持续更新、不断完善。为外卖业务的快速迭代提供了有力支持和有效保障，其中 RN 组件库 作为公司项目对外开源，收到诸多好评。

定位

为了提升商家端视觉体验，统一视觉风格，18年6月份外卖和 MTUX 开始对袋鼠 UI 进行视觉升级。同时为了提升组件复用率和质量，减少业务接入成本，对它进行全面改造和优化，使其具有标准、可靠、丰富、易用等特性：

标准：公司统一的设计（MTD）规范，各组件库统一的开发规范；

可靠：规范的开发流程，严格的测试标准；

丰富：包含基础、业务、行业（图表）组件，提供多套主题，涵盖 PC 和移动端；

易用：简洁的使用文档，丰富的组件示例；

并对 Roo（袋鼠 UI ）重新定位，在满足外卖业务的基础上，为其他事业群（部）提供组件（开发）服务。

设计理念
Roo 在设计上主要围绕“如何低成本高效的达成目的”，因此目标设定为“高效率、可拓展、标准化”。我们对设计资源（UI 资源和 UI 生产方式）进行了控件规则设定，依托 DPL（设计模式标准化）将设计标准代码化，并转化为控件。为设计、技术和业务等人员提供组件服务，有效提高多角色的人效，并保障设计方案与落地实现的一致性。

结合“原子理论”，我们提出以下的设计原则和目标：

将 UI 资源拆分为最小颗粒度的原子，即控件拆分为元素属性和参数；

适配多端语言，降低开发语言与语言的差异，保障复用和还原度；

自由组合的组成方式，可以灵活拓展新控件，提升开发、设计人效；


图1：Roo设计

系统架构
Roo 是一套涵盖 PC 和移动端的系列组件库，因此需要有一个高复用、低耦合的架构，用以支持不同的技术栈（React、Vue、RN）。

locale
Button
demo
index
Button
Select
demo
index
Select
Radio
demo
index
Radio
Jest
@wmfe/eslint-config-mt
TSLint
......
add
dev
test
build
publish
Docgen
@utiljs
...
Enzyme
MDX
Demo
Docz
MNPM
Babel
Bash
Node
roo theme
roo-cli
主题层
基础层
组件层
测试层
构建+发布层
文档层

图2：PC版React 架构

如图2所示，核心架构主要分为以下几部分：

主题层

是一套多端主题方案，采用样式与组件逻辑分离的方式，一方面降低组件开发成本，另一方面主题也更易于维护、升级和拓展。 目前已支持四套主题，业务方可根据自身场景选择性接入。

基础层

主要是底层通用工具和服务，包含国际化模块、外卖 ESLint 工具、@utiljs 公共代码库等，让组件的底层和依赖模块更加可靠。

测试层

选取业界通用的 Jest + Enzyme 的单测方案。Unit Tests 包含所有组件，每个组件大量的单测用例来保障组件质量，单测整体覆盖率达 90% 以上。

构建+发布层

采用轻量级编译构建方案，TypeScript 和 Babel 结合的编译方式，代码最终由 TypeScript 代码编译为 ES5 代码，消除用户引用组件触发的兼容性问题。支持两种接入方式：按需引用和全部引用，通过 MNPM 发布。

命令行工具

命令行工具 roo-cli 为 Roo 各组件库开发提供辅助能力，主要用于规范和标准化组件开发流程，降低开发者开发和维护成本；组件库只需配置组件模板，即可使用。

文档层

文档工具 roo-docs 通过解析 Markdown 和 TypeScript 定义的 Interface 及注释自动生成文档，降低文档的开发和维护成本，并且为开发者提供丰富的组件演示、示例代码和组件对应的属性列表（包含属性类型、属性默认值和属性说明等）。

组件质量
为了保障组件最终产出的质量，Roo 在开发规范、技术选型、验收标准等方面，制定了一系列的规范和标准。

开发规范

命名规范

Roo 系列组件库的 Git 仓库、包管理地址、使用文档、官网等有统一的命名。如 PC 版 React 组件库的包管理和官网地址分别为 http://npm.sankuai.com/package/@roo/roo 和 https://roo.sankuai.com/roo 。同一组件库内部，组件的样式和布局也有统一的规范。

版本规范

遵循语义化的 SemVer 版本规范。

语法规范

使用 ESLint 来保证统一的代码风格，除此之外还有一些最佳实践来保证项目的一致性。

外卖长期实践总结的 React 最佳实践，这是一份明确、可执行、实例化的 React 最佳实践，包括建议、最佳实践和反模式部分，共包含16个方面的建议。

CSS 很简单，但也很容易变得不可维护，外卖长期实践总结的 CSS 规范，从多个方面对书写更好的 CSS 做了指导，包括选择器、命名、嵌套、响应式、兼容性、import 等。

遵守外卖统一的 z-index 规范，包括使用建议、分层规则、与 Mixin 工具等，保证整个项目的一致性。

接口统一

在 Roo 系列组件库中，组件核心 API 保持统一。

Git 规范

组件库遵守统一的提交信息规范，分支规范，冲突解决规范，来保证多人并行开发的秩序。

API 兼容规范

次要版本和修订版本API保持向下兼容。

技术选型

针对之前组件库接口开发不友好，构建依赖及浏览器 Polyfill 问题，组件未经严格单元测试等问题。我们结合目前主流的 IDE ，为开发者提供 API 自动提示；减少因 Polyfill 而引入的成本；并自动构建组件 Demo，便于开发者自测。从开发语言、测试工具、编译工具、组件文档等方面确定了以下选型：

开发语言：TypeScript + React

测试工具：Jest + Enzyme

编译工具：Babel7

组件文档：mdx + docz + docgen

验收标准

ESLint 检查：采用外卖统一的 @wmfe/eslint-config-mt 方案，代码 0 error。

兼容性：PC 版支持现代浏览器，Chrome 29 及以上版本，IE9 及以上版本；移动版 需要兼容 Android 4.4 和 iOS 9 及以上的系统。

单测覆盖：每个组件单测覆盖率需达到90%以上。

Stmts

Branch

Funcs

Lines

95.5%

91.02%

94.41%

95.98%

表1：PC版React 平均单测覆盖率

组件接入
当前进度

经过半年的建设，Roo 已完成系列组件库的开发，部分业务已经接入并上线。为方便接入和使用，Roo 对系列组件库命名进行了规范与调整：

roo（PC版 React）：支持基础、表单、导航、容器、弹窗等34个常用组件；目前已升级、上线20余项目。

roo-vue（PC版 Vue）：支持基础、表单、导航、容器、弹窗等34个常用组件，5个业务组件；外卖商家端大部分页面已升级、上线。

roo-mobile（移动版 React）：一期完成，支持基础、表单、导航、容器、弹窗等25个常用组件；春节后业务开始升级。

roo-chart（PC版 React图表库）：支持常用的8种图标组件，应用于天璇等数据平台。

roo-mobile-rn（移动版 RN）：目前已完成常用组件的开发（与到店共建），业务组件会逐渐添加。

使用文档

为了方便大家快速接入 Roo，我们从组件加载、使用文档、主题切换和国际化等方面进行详细说明：

组件加载： 在组件加载上我们提供与开源项目相同的方式，保证了开发者的无缝接入和使用习惯。

按需加载:   按需加载只会加载当前组件关联的 React 代码和样式代码。

整体加载： 我们提供了打包好了的组件库。

多主题切换:  Roo  内置 4 套主题（默认主题，蓝色主题，绿色主题，科技主题），可在文档站点内右上角点击主题进行切换查看，代码内只用修改引用路径即可进行主题切换。

组件命名： 组件标准化的中英文命名和一致的 API 命名规范，减少在文字上的困惑，保障开发者的开发体验。

组件说明： 我们提供丰富的组件示例和详细的 API 说明。开发者通过丰富的组件示例，省去逐个 API 的测试，得以提高开发效率； 通过详细的 API 列表，可以快速了解组件属性的类型，默认值和说明等。


     图3：Button组件文档

TypeScript  支持：Roo 由 TypeScript 编写,  可以利用编辑器的智能化提示快速获取组件 API 的参考。

国际化支持：组件库默认支持： 简体中文、繁体中文和英文，修改对应语言文件路径即可切换。

代码块
JavaScript
import locale from '@roo/roo/locale';
import tw from '@roo/roo/locale/lang/zh-TW';
​
locale.use(tw);
​
图4：使用繁体字示例

交流共建
共建规划

Roo 系列组件库的升级时间紧、业务压力大，为了高效高质的完成，我们制定了一套标准规范和共建流程，提供了辅助开发的命令行工具 @roo/roo-cli ，以及自动生成组件文档的方案 roo-docs 。在这些规范和工具的帮助下，先后有40多位同学参与了组件开发、业务升级等。我们也诚邀大家共同参与，一起积累和沉淀更多的组件，更好的支撑业务的发展。

从2019年Q4起，Roo 会逐步对外开源，期待与大家一起打造前端组件品牌，共同提升美团前端的技术影响力。

交流沟通

如果大家对 Roo 感兴趣，想要了解更多的细节；或在使用的过程中，有任何问题，欢迎随时进群讨论。


Iconfont 版本化图标字体平台
作者 @徐潇潇 

背景
图标是几乎所有用户界面里不可或缺的部分，通过图形化的语言来简洁清晰的表达对象、动作或想法。图标字体技术已经非常成熟，由于其尺寸小加载速度快、使用便利、兼容性好等特性，非常受前端开发者的喜爱。公司现有的图标字体的使用和维护，大多是通过 Iconfont.cn，即阿里巴巴矢量图标库。但是，随着业务的发展壮大、图标的层出不穷，在使用外部图标库的过程中，也出现了一系列问题：

跨部门或团队的协作非常困难：由于导出的字体都是统一的 font-family，会导致无法在页面中引用多个字体；用户间的图标共享只能通过申请公开库才能解决。

缺少版本控制：用户需要自己来维护和更新字体文件。因为没有版本和历史，一旦出现图标的更替，修改和测试成本都较高。

与现有流程割裂：用户使用图标字体，都需要下载到本地，然后上传到工程库或 CDN 的过程，非常麻烦并且容易误操作。

外部系统的稳定性，始终心存侥幸和担忧。

针对以上问题，我们自建了一套 Iconfont 平台。

整体设计
Iconfont 平台围绕图标的管理和使用，划分了『图标库』和『图标项目』两个维度。

图标库：图标库用来管理图标，一般以业务或部门为单位进行划分，用来构建标准化的图标管理流程。

图标项目：图标项目是图标使用的单位，每个项目所使用的图标都来自于图标库，可以按需使用。


由此，我们梳理出了图标的两个主要功能模块：围绕图标库的『图标管理』功能，以及围绕图标项目的『图标使用』功能。

同时，也根据功能和流程，划分了『普通用户』、『库管理员』和『项目管理员』的角色。

图标管理：以图标库为单位，提供流程化的图标管理方式，包括：上传、审核、替换和使用。

普通用户负责上传和替换制作的图标。

库管理员负责图标的审核，为图标的质量提供保证。

图标使用：以项目为单位，提供了图标选择、字体生成、版本控制、导出和上传功能。

普通用户负责增删图标以及图标导出和下载之后的使用。

项目管理员负责维护项目的基本信息和成员，为项目的输出提供保证。


功能特性
围绕着上面所介绍的整体设计，Iconfont 平台提供了一些非常实用的特性，很好的解决了外部图标库的不足，提供了更完善的服务。

1. 共享和协作

Iconfont 平台中所有的图标库都是公开的，图标上传到图标库经过审核之后，就对外开放使用了。通过合理的图标同享机制，跨团队跨业务的合作能够更加顺畅，也能够更有效地利用设计资源。


为了方便协作，我们提供了两个维度的图标共享方式：

一个项目同时使用多份字体。

外部平台：不同项目导出的字体的 font-name 是一样的，在同一个页面中使用时，会导致字体之间互相覆盖。

Iconfont 平台：按照项目名来生成每份字体的 font-name，保证项目名的唯一性即可，不会引起字体覆盖的问题。

一份字体同时使用多个图标库的图标。

外部平台：私有库的图标必须要申请公开，才可以被共享。

Iconfont 平台：所有的库都是公开的，因为是内部使用的系统，也没有版权、安全之类的风险。对于不同库同样的名称的图标，采用『库名称-图标名称』命名，来保证其唯一性。

2. 版本控制

Iconfont 平台为了解决图标字体在使用时，不同时间导出可能产生不一样产物的问题，对项目生成的字体使用了版本控制。

当项目中的图标发生了变化时，比如：增加或删除了图标，在第一次使用时（导出或下载时）会产生新的版本。

对于不同的变更范围，提供了大中小三种版本号升级。

对于项目中本次的变更，在不同环节均有标注和确认，防止误操作。


针对不同的版本，平台提供了版本对比的功能。在升级图标字体版本时，能够有效控制影响范围。

对于一般的项目升级，只需要对比两个版本的差异化，进行测试即可，减少了回归测试的风险。

对于项目的历史追溯，提供了方便查看的途径。


通过以上两种方式，能够有效地控制风险，减少工作量。为图标字体的使用，提供了有利的保障。

3. 流程优化

为了方便开发者在开发流程中使用图标字体，Iconfont 平台提供了三种获取使用和获取生成字体的方式，能够很简单地纳入现有开发体系中。

上传到 CDN

平台会将生成的字体上传到 CDN 上，直接复制链接使用即可。CDN 链接是开发时最方便和直接的使用方式：一方面便于管理，不再需要额外维护资源文件；另一方面资源的拆分也利于缓存。

API 获取

平台也对外提供了 API，方便用户通过 API 直接获取生成产物，以便进行一些自动化的流程。API 能够获取的，包括：最新的版本信息，以及所有版本的生成物。

直接下载

对于一些场景，比如客户端内置等，平台还提供了直接下载生成字体产物的功能。由于这种方式需要人工维护资源，只推荐在一些临时场景使用。一些必须直接使用资源文件的场景，可以通过 API 的方式进行流程化。


开始使用
 目前 Iconfont 平台已经支持了多个业务的图标字体的使用，并且提供了批量导入 Iconfont.cn 图标的功能。欢迎迁移和使用。

Iconfont 平台：https://iconfont.sankuai.com/

使用文档：iconfont


TypeScript赋能，提高已有Vue项目的含金量
作者 @林提 & 客满满web前端质量小组

一、前言
最近一段时间，我们小组开始在原有的Vue项目里进行TS改造实践。这篇文章是我们在做TS改造实践中所做的总结。

已实现的效果：

.vue(js) 文件使用 ESLint(+SonarJS 规则) 检查；

.vue(ts), .ts 文件使用 TSLint(+SonarTS 规则) 检查；

.js 文件使用 TSLint(+ESLint 规则) 检查；

目前已知的缺陷：

SonarTS 中的部分规则要求 ts-loader 必须开启 type-check 选项，但开启后无法识别 .vue(ts) 文件，因此这里没有开启 type-check，即 SonarTS 中部分规则无法使用。具体规则见 tslint-sonarts，规则里面带有 “requires type-check” 的规则均无法使用；

社区中有使用 fork-ts-checker-webpack-plugin 这个插件来解决上述问题，@vue/cli 官方也是使用这个插件来解决此问题，但在我实验下，使用此插件后，TSLint 会对 .vue(js) .vue(ts) 文件不作区分，都用 TSLint 的规则扫描，这会从旧代码里扫出不少问题。因此暂时没有采用此规则；

如果项目使用 @vue/cli 3.0 以上，建议直接使用 vue cli 的配置，目测没有上面提到的缺陷 ;)

二、环境配置
2.1 开发环境

Node（"6.* || 8.* || >= 10.*"） + Vue(2.5.17) + Vuex(3.0.1) + ES6 + ESLint + TSLint + SonarJS   +   TypeScript(^3.1.6) + webpack

2.2 安装依赖

package.json
JSON
"dependencies": {
  ...
  "vue-property-decorator": "^7.2.0",
  "vuex-class": "^0.3.1",
},
​
"devDependencies": {
  ...
"ts-loader": "3.5.0",
  "tslint": "^5.11.0", // ts核心规则 https://github.com/palantir/tslint
  "tslint-config-airbnb": "^5.11.1", // 使用airbnb的配置 https://github.com/progre/tslint-config-airbnb
  "tslint-eslint-rules": "^5.4.0", // 在tslint中支持部分eslint规则 https://github.com/buzinas/tslint-eslint-rules
  "tslint-loader": "^3.5.4",
  "tslint-sonarts": "^1.8.0", // ts代码扫描 https://github.com/SonarSource/SonarTS
  "typescript": "^3.1.6",
}
​
2.3 配置修改

修改webpack.config.js

配置对js文件跟ts文件都使用tsline-loader，进行代码检查。

配置Vue文件里的TS代码使用ts-loader+tslint-loader进行加载，JS代码使用eslint-loader进行加载。

配置对ts文件使用ts-loader加载

在resolve的extension里面加入 .ts 

在项目根目录添加文件 tsconfig.json

在项目根目录添加文件 tslint.json

示例： 

webpack.config.js
JavaScript
// 本示例使用的是webpack3，如需升级webpack4，只需按webpack4的规则配置对应的loader即可。
const loaders = [
    // 对js文件跟ts文件都使用tsline-loader
    {
        test: /\.(js|ts)$/,
        enforce: 'pre',
        // 这里排除的文件每个项目可能会不同，根据需要添加
        exclude: [/node_modules/],
        loader: 'tslint-loader',
        options: {
            // typeCheck: true, // 配置是否开启 type-check
            // tsConfigFile: '../tsconfig.json', //自定义tsconfig.json的位置，默认使用根目录下的
            configFile: './tslint.json', //自定义tslint.json的位置，默认使用根目录下的
            emitErrors: true,
        },
    },
    {
        test: /\.vue$/,
        // enforce: 'pre',
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
            extractCSS: process.env.NODE_ENV === 'production',
            loaders: {
                less: 'vue-style-loader!css-loader!less-loader',
                // .vue 文件中的 js/ts 分别进行 lint
                ts: [
                    'ts-loader',
                    {
                        loader: 'tslint-loader',
                        options: {
                            emitErrors: true,
                        },
                    },
                ],
                js: {
                    loader: 'eslint-loader',
                },
            },
        },
    },
    {
        test: /\.ts$/,
        loader: 'ts-loader',
        // 这里排除的文件每个项目可能会不同，根据需要添加
        exclude: /node_modules/,
        options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
        },
    },
  // ...
];
// ...
module.exports = {
    // ...
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        // ...
    }
};
​
tsconfig.json
JavaScript
{
    "compilerOptions": {//compilerOptions:编译选项,可以被忽略，这时编译器会使用默认值
        "allowSyntheticDefaultImports": true,//允许从没有设置默认导出的模块中默认导入。这并不影响代码的显示，仅为了类型检查。
        "allowJs": true,//允许编译javascript文件。
        "baseUrl": ".",//解析非相对模块名的基准目录
        "esModuleInterop": true,//允许从没有默认导出的模块进行默认导入。这不会影响代码发出，只会影响类型检查。
        "experimentalDecorators": true,//启用实验性的ES装饰器
        "importHelpers": true,//从tslib导入辅助工具函数（比如__extends，__rest等）
        "module": "esnext",//指定生成哪个模块系统代码
        "moduleResolution": "node",//决定如何处理模块。或者是"Node"对于Node.js/io.js，或者是"Classic"（默认）
        "noImplicitAny": false,// 是否不允许值类型为 any
        "noImplicitReturns": true,//不是函数的所有返回路径都有返回值时报错。
        "outDir": "./built/",//输出目录
        "sourceMap": true,//用于debug ,生成相应的.map文件
        "strict": true,//启用所有严格类型检查选项。 启用--strict相当于启用--noImplicitAny, --noImplicitThis, --alwaysStrict和--strictNullChecks。
        "target": "esnext",//目标代码类型
    },
    "include": [
        "app/**/*.ts",
        "app/**/*.vue"
    ],
    "exclude": [ //如果"files"和"include"都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件（.ts, .d.ts 和 .tsx），排除在"exclude"里指定的文件。
        "node_modules/**/*.vue",
...
    ]
}
​
​
tslint.json
JSON
{
    "defaultSeverity": "error",
    "extends": ["tslint-config-airbnb", "tslint-sonarts"],//内置配置预设名称，一般采用其官方推荐的值，此值较为稳定:tslint:recommended
    "rules": {//规则配置,配置的这些规则将应用到.ts和.tsx文件中。规则可以是一个对象，对象中包含两个属性：options?: any, severity?: 'default' | 'error' | 'warning' | 'off'，其中options是一个包含设定值的数组。规则也可以仅仅是一个布尔值，或者也可以是一个数组。
        "quotemark": [true, "single"],//引号的使用规则
        "indent": [true, "spaces", 4],//使用Tab进行缩进，每次强制缩进4个字符
        "ter-indent": [true, 4],//三元缩进规则
        "interface-name": false,//接口名称必须以I开头，关闭
        "ordered-imports": false,//import的文件必须按照字母顺序排列分组，关闭
        "object-literal-sort-keys": false,//检查对象文字中键的排序，关闭
        "no-consecutive-blank-lines": false,//不允许连续出现一个或多个空行
        "import-name": false,//import名称的限制规则 #tslint-microsoft-contrib
        "function-name": false,//函数名称的限制规则
        "max-line-length": {//要求每行的长度必须在150个字符以内
            "options": [150]
        },
        "no-commented-code": false //禁止代码注释
    },
    "jsRules": {//其规则设定同rules，只不过设定的这些规则将应用于.js和.jsx文件
        "quotemark": [true, "single"],//引号的使用规则
        "object-literal-sort-keys": false,//检查对象文字中键的排序。
        "no-consecutive-blank-lines": false,//不允许连续出现一个或多个空行。
        "curly": [true, "ignore-same-line"],//强制执行if / for / do / while语句的大括号
        "no-empty": [true, "allow-empty-functions"],//禁止空块。
        "max-line-length": {//要求每行的长度必须在150个字符以内
            "options": [150]
        },
        "no-commented-code": false //禁止代码注释
    }
}
​
​
三、*.vue文件的TS改造
js文件直接改为ts文件，除了一些细节的写法问题，基本没有障碍。因此下面主要介绍一下vue文件接入TS的改造方案，主要分为两个方案：
1）Vue.extend方案：使用基础 Vue 构造器。此种写法与 Vue 单文件组件标准形式较为接近。

2）vue-property-decorator方案：提供一系列装饰器，能让我们书写类风格的 Vue 组件

3.1 方案一：Vue.extend 进行改造

方案一也是2018年3月份，在VueConf.us大会上，微软项目经理Daniel Rosenwasser介绍的TypeScript与Vue结合开发的方案。

使用 Vue.extend({})进行Vue文件编写，Vue文件的script标签使用<script lang='ts'>

对computed 属性加入对应的type，如：

代码块
Plain Text
greeting(): string {
return `Hello ${this.name}`;
}
​
加入tsconfig.json配置（strict: true）

使用vscode进行开发，使用vetur。

Vue 2.5以上 typescript 2.8以上

3.1.1 改造前后的写法对比

这种改造方式只有mixin的写法略有不同，支持多个mixin需要引入插件https://github.com/ktsn/vue-typed-mixins 

.vue(js) 写法

.vue(ts) 写法

引入单个mixin

代码块
Vue.js Component
import TSPageMixinJS from './tspage-mixin-js';
​
export default {
    // ...
    mixins: [TSPageMixinJS],
}
​
mixin文件（tspage-mixin）

代码块
Plain Text
import Vue from 'vue';
export default Vue.extend({
  
});
​
主文件，引入mixin文件

代码块
Vue.js Component
import TSPageMixin from './tspage-mixin';
​
export default TSPageMixin.extend({
  
});
​
引入多个mixin

代码块
Plain Text
import TSPageMixinJS from './tspage-mixin-js';
import TSPageMixinJS2 from './tspage-mixin-js2';
​
export default {
    // ...
    mixins: [TSPageMixinJS, TSPageMixinJS2],
}
​
当使用多个 mixins 且推断出类型时 无法工作，在这个 Issuse 中官方也明确表示现在没有做这块的适配。

可以使用https://github.com/ktsn/vue-typed-mixins 来做多个mixins的扩展（引入vue-typed-mixins 插件）。

3.2 方案二：Vue-property-decorator

vue-class-component，强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组，比较广泛使用的是 vue-property-decorator，它是在 vue-class-component 上增强更多的结合 Vue 特性的装饰器。

联系与区别：

vue-property-decorator社区出品；vue-class-component官方出品

vue-class-component提供了Vue、Component等；vue-property-decorator深度依赖了vue-class-component，拓展出了更多操作符：@Prop、@Emit、@Inject、@Model、@Provide、@Watch、@Component；

开发时正常引入vue-property-decorator就行

3.2.1 改造前后的写法对比

.vue(js) 写法

.vue(ts) 写法

文件导出的内容

对象 object

component-1-js.vue
Vue.js Component
<script type="text/babel">
export default {
  name: 'component-a',
  mounted() {
    console.log('mounted');
  },
}
};
</script>
​
类 class

component-1-ts.vue
Vue.js Component
<script lang="ts">
import { Vue } from 'vue-property-decorator';
​
@Component
export default class ComponentA extends Vue {
name = 'component-a';
  mounted() {
    console.log('mounted');
  }
}
</script>
​
属性

对象属性

代码块
Vue.js Component
export default {
  name: 'page-js',
}
​
类的实例属性

代码块
Vue.js Component
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class PageTotal extends Vue {
  name = 'page-ts';
}
​
data

data 函数返回对象

代码块
Vue.js Component
export default {
    name: 'page-js',
    data() {
        return {
            color: '#aabbcc',
        }
    }
}
​
类的实例属性

代码块
Vue.js Component
import { Vue, Component } from 'vue-property-decorator';
​
@Component
export default class PageTotal extends Vue {
    name = 'page-ts';
    color = '#aabbcc';
}
​
计算属性

computed 对象内

代码块
Vue.js Component
export default {
// ...
    computed: {
        colorName() {
            return `name is ${this.color} ${this.name}`;
        }
    },
}
​
作为 getter

代码块
Vue.js Component
import { Vue, Component } from 'vue-property-decorator';
​
@Component
export default class PageTotal extends Vue {
// ...
    get colorName() {
        return `name is ${this.color} ${this.name}`;
    }
}
​
方法

methods 对象内

代码块
Vue.js Component
export default {
    // ...
    methods: {
        changeColor(color = 'red') {
            this.color = color;
        }
    },
}
​
类的实例方法

代码块
Vue.js Component
import { Vue, Component } from 'vue-property-decorator';
​
@Component
export default class PageTotal extends Vue {
    // ...
    changeColor(color = 'red') {
        this.color = color;
    }
}
​
生命周期函数

beforeCreate()

created()

beforeMount()

mounted()

beforeUpdate()

updated()

beforeDestory()

destoryed()

作为导出对象的方法

代码块
Vue.js Component
export default {
    name: 'page-js',
​
// ...
    created() {
        this.changeColor('blue');
    },
    mounted() {
        this.$nextTick(this.changeColor);
    },
}
​
类的实例方法

代码块
Vue.js Component
import { Vue, Component } from 'vue-property-decorator';
​
@Component
export default class PageTotal extends Vue {
    name = 'page-ts';
​
    created() {
        this.changeColor('blue');
    }
    mounted() {
        setTimeout(
            () => {
                this.changeColor();
            },
            2000,
        );
    }
}
​
除上面以外的其他内容，都需要用到  vue-property-decorator (vue-class-component)

mixin 写法

同 .vue(js）

同 .vue(ts)

引入 mixin

mixins 属性里

代码块
Vue.js Component
import TSPageMixinJS from './tspage-mixin-js';
import TSPageMixinJS2 from './tspage-mixin-js2';
​
export default {
    // ...
    mixins: [TSPageMixinJS, TSPageMixinJS2],
}
​
导出的 class 继承 Mixins()

代码块
Vue.js Component
import { Vue, Component, Mixins } from 'vue-property-decorator';
import TSPageMixin from './tspage-mixin';
import TSPageMixin2 from './tspage-mixin2';
​
@Component
export default class PageTotal extends Mixins(TSPageMixin, TSPageMixin2) {
    // ...
}
​
props、components、directives、filters、watch、model、provide、inject

props 对象作为导出对象的属性

代码块
Vue.js Component
export default {
    name: 'page-js',
​
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        message: {
            type: String,
            default: 'hello from js page',
            validator(v) {
                return v.length <= 25;
            },
        },
    },
// ...
}
​
props对象作为 @Component() 装饰器的参数对象的属性，components、directives、filters、watch、model、provide、inject与props写法类似。

代码块
Vue.js Component
import { Vue, Component, Mixins } from 'vue-property-decorator';
​
@Component({
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        message: {
            type: String,
            default: 'hello from total ts page',
            validator(v) {
                return v.length <= 25;
            },
        },
    },
})
export default class PageTotal extends Mixins(TSPageMixin, TSPageMixin2) {
    name = 'page-ts';
    // ...
}
​
下面的内容也可以用 vue-property-decorator 提供的装饰器写

@Emit

@Inject

@Model

@Prop

@Provide

@Watch

用法说明：

https://github.com/kaorun343/vue-property-decorator

代码块
JavaScript
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    },
  }
  methods: {
    onChildChanged(val, oldVal) { }
  },
  watch: {
    'child': {
      handler: 'onChildChanged',
      deep: false
    }
  }
}
​
代码块
JavaScript
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
​
@Component
export class MyComponent extends Vue {
  @Prop(Number) propA!: number
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC!: string | boolean
    
​
  @Watch('child',{deep:true})
  onChildChanged(val: string, oldVal: string) { }
}
​
（感叹号为非空断言）

3.3 方案分析

两种方案在书写上存在一定区别。

方案一：Vue.extend

方案二：vue-property-decorator

写法

更接近Vue的组件化写法

更接近TypeScript的类的写法

改动点

少，写法基本保持不变

多，相对难习惯

mixin支持程度

多个mixin需要引入插件，https://github.com/ktsn/vue-typed-mixins

mixin文件同.vue(ts)写法（即vue-property-decorator写法），引入写法基本不变

官方态度

官方对多个mixin的引入未做适配，解决方案采用的插件的使用情况：github和npm

vue-class-component为官方出品，github及npm上关注和使用量较大

潜在问题

两者都是官方推荐的方法，vue.extend引入多个mixins的插件使用量较少，有待观察。

四、如何编写类型声明文件
一些第三方 npm 包是用 JS 写的，引用时需要为其加上类型声明文件 .d.ts 。这时有两种方式：

在JS 文件相同位置添加相同文件名的 .d.ts 文件，一般针对内部开发维护的组件库这种。

在@type包增加第三方库的外部声明文件。这个也是官方比较推荐的做法。现在@types里的声明文件已经比较丰富了，可以去官方维护的： http://microsoft.github.io/TypeSearch/ ，或者社区维护的：https://github.com/DefinitelyTyped/DefinitelyTyped上查找。有些模块现在暂时没有声明文件的，也可以自己编写声明文件后PR到社区维护的库里。 

默认所有可见的"@types"包会在编译过程中被包含进来。 node_modules/@types文件夹下以及它们子文件夹下的所有包都是可见的； 也就是说， ./node_modules/@types/，../node_modules/@types/和../../node_modules/@types/等等。首先，编译器会尝试定位表示导入模块的文件。 编译器会遵循以下二种策略之一： Classic或Node。 这些策略会告诉编译器到 哪里去查找moduleA。如果上面的解析失败了并且模块名是非相对的（且是在"moduleA"的情况下），编译器会尝试定位一个外部模块声明。 

4.1 类型声明文件的写法

TypeScript 的 DefinitelyTyped 声明文件有两种写法，一种叫做 全局类型声明(Global Type Definition)，另一个则是叫做 模块导出声明(External Module Definition)。

DefinitelyTyped 对此的说明是：

如果你的模块需要将新的名称引入全局命名空间，那么就应该使用全局声明。

如果你的模块无需将新的名称引入全局命名空间，那么就应该使用模块导出声明。

为了不增加旧代码的改动，我们尽量使用全局类型声明的写法对维护我们的组件库。以 @gfe/coca-style/vue-components/simpletable/col_type.js 文件为例

col_type.js
JavaScript
export default {
    NORMAL: 'NORMAL',
    HTML: 'HTML',
    CHECK: 'CHECK',
    BTN_ACTION: 'BTN_ACTION',
};
​
​
js 文件不用更改，在同级目录下新增文件 col_type.d.ts

col_type.d.ts
JavaScript
export declare namespace COL_TYPE {
    const NORMAL: string;
    const HTML: string;
    const CHECK: string;
    const BTN_ACTION: string;
}
​
export default COL_TYPE;
​
​
在引入 col_type.js 的文件内，即可识别类型，并智能提示；


更复杂的例子🌰：

@gfe/coca-style/vue-components/message/index.js

@gfe/coca-style/vue-components/message/index.js
JavaScript
// ...
export default {
    show(content, duration, onClose) {
        return notice(content, duration, '', onClose);
    },
    info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },
            const instance = getMessageInstance();
        messageInstance = null;
        instance.    },
};
​
​
index.d.ts

代码块
JavaScript
type cb = () => void;
type fn = () => void;
​
export declare namespace message {
    function show(content: string, duration?: number, onClose?: cb): fn
    function info(content: string, duration?: number, onClose?: cb): fn
    function success(content: string, duration?: number, onClose?: cb): fn
    function error(content: string, duration?: number, onClose?: cb): fn
    function destroy(): void;
}
​
export default message;
​
​
实现效果：能检测类型，并且智能提示api


五、实践中遇到的问题
此表格记录了项目成员在TS改造实践中所遇到的问题。

问题

解决方式

页面内引入几个组件，渲染结果几个组件内的静态文本，包括 CSS 类名、文字 等都被最后一个引入的组件覆盖。

这是引入的组件用 TS 写，但没有用 @Component 装饰器

在 export default class ComponentXXX extends Vue {} 上面加上装饰器即可。

代码块
Vue.js Component
@Component// 问题的原因在于没写这一行。这一句是必须要写的。
export default class PageTotal extends Vue {
    name = 'page-total';
}
​
​
TS2345: Argument of type '{ imgUploader: VueConstructor<Vue>; }' is not assignable to parameter of type 'VueClass<Vue>'.

  Object literal may only specify known properties, and 'imgUploader' does not exist in type 'VueClass<Vue>'.

@Componet 装饰器参数写法错误

代码块
Vue.js Component
// 错误代码
@Component({
    imgUploader,
})
​
// 改为这样
@Component({
    components: {
        OnlinePayAnalysis,
        OnlinePayDetail,
        'app-panel': Panel,
    },
})
​
​
无法识别 $refs，使用时报错

ts 无法识别选组的组件的类型，添加类型，并让 ref 组件应用类型

代码块
Vue.js Component
// 先定义一个 interface
interface ControlPanelType extends Vue {
    search(): void;
}
​
// 再将此 ref 应用此接口
const controlPanel = this.$refs.controlPanel as ControlPanelType;
controlPanel.search();
​
​
File '.../col_type.d.ts' is not a module.

为 JS 文件写的的类型声明文件 .d.ts 写法错误。

注意 .d.ts 文件导出的方法，col_type.js 导出采用  export default {} 形式，对应的 .d.ts 文件也要有这样的形式，代码如下：

col_type.js
JavaScript
export default {
    NORMAL: 'NORMAL',
    HTML: 'HTML',
    CHECK: 'CHECK',
    BTN_ACTION: 'BTN_ACTION',
};
​
​
col_type.d.ts
JavaScript
// 此写法可以适配 js 写法：export cosnt col_type = {} 或者 export { col_type }
export declare namespace COL_TYPE {
    const NORMAL: string;
    const HTML: string;
    const CHECK: string;
    const BTN_ACTION: string;
}
​
// 此写法可以适配 js 写法：export default {}
export default COL_TYPE;
​
// 二者都保留即可
​
​
typescript中报错“error TS2307: Cannot find module ‘moduleA’.”

typescript模块加载时候的寻找策略错误。文档地址：这里

tsconfig.json文件中，module类型为AMD，system，或者ES6时候，会默认将模块搜寻策略moduleResolution设置为“Classic”。这种策略下，是不会去node_modules目录下寻找模块的。

解决方法，指定moduleResolution为“Node”，就会按照nodejs的模块寻找策略去搜索模块了。

moduleResolution 在Vue文件中没有生效，加入 transpileOnly: true,

Property 'INITIAL_DATA' does not exist on type 'Window'.

没有声明window上新增的变量添加类型声明，可以局部添加，也可以全局添加。常用的数据建议全局添加；局部添加类型声明：

代码块
JavaScript
1) You can reinterpret navigator prop.
(<any>window).INITIAL_DATA;
2) You can declare id prop youself
mycompany.lib.d.ts
interface Window {
  INITIAL_DATA: any
}
app.ts
window.INITIAL_DATA.userid;
​
​
全局添加类型声明：在 app/ 文件夹下新增文件 global.d.ts

global.d.ts
JavaScript
declare function LXAnalytics(type: string, bid: string): void;
​
declare interface Window {
    INITIAL_DATA: InitialData;
    // todo
    LXAnalytics: LXFunc;
}
​
// 将 InitialData 中的数据添加到这里
declare interface InitialData {
    androidPadUrl: string;
    androidUrl: string;
    buid: number;
    hasRoom: number;
    iOSPadUrl: string;
    iOSUrl: string;
    isShare: number;
    isShareMember: boolean;
    isWithoutPassword: boolean;
    nowTime: number;
    padWhiteList: number[];
    pageInfo: (number | string)[];
    receiptAuth: boolean;
    rootShopId: number;
    // 对象组成的数组,对象有多个属性
    shopList: ShopListItem[];
    shopName: string;
    shopid: number;
    sidebarList: SidebarListItem[];
    userid: number;
    username: string;
    voiceConfig: boolean;
    weChatAuth: boolean;
    webDomain: string;
}
​
interface ShopListItem {
    addTime: string;
    address: string;
    businessHours: string;
    businessType: number;
    city: string;
    cityID: number;
    closingTime: string;
    createdBy: string;
    description: string;
    district: string;
    districtID: number;
    dpCustomerID: number;
    dpShopID: number;
    effectiveBeginDate: string;
    effectiveEndDate: string;
    isMemberShipCardShare: boolean;
    openingTime: string;
    // ?
    operateType: number;
    parentID: number;
    payAccountShopName: string;
    phoneNo: number;
    poiID: number;
    province: string;
    provinceID: number;
    // ?
    shopAddressDO: string;
    shopAddressID: number;
    // ?
    shopBrand: string;
    shopBrandID: number;
    shopCode: string;
    shopID: number;
    shopName: string;
    source: number;
    status: number;
    tag: number;
    telephone: number;
    updateTime: string;
    userAccountID: number;
}
​
interface SidebarListItem {
    active: boolean;
    description: string;
    groupID: number;
    icon: string;
    name: string;
    sub: SidebarListItem[];
    subActive: boolean;
    url: string;
    virtual: boolean;
}
​
interface LXFunc {
    (type: string, bid: string): void;
}
​
​
​
arguments are not aligned

tslint 中的规则之一，多个函数参数没有对齐

代码块
Plain Text
setTimeout(() => {window.location.reload();},1250);
改为：
setTimeout(
  () => {
  window.location.reload();
  },
1250,
);
​
​
​
编辑器里面 eslint 会检查 vue里的ts代码 并报错。

missing file extension


Expected 'this' to be used by class method（class-methods-use-this）


方法前加上public等字样，eslint报错

eslint 无法识别 ts 代码，eslint 添加 ts 插件

.eslintrc.json
JavaScript
"plugins": ["html","sonarjs","typescript"],
​
​
property does not  exsit on type "{}"


对象或数组取默认值，待解决

1）暂时可将类型定义为any

2）每个页面建立一个模块，导入模块ShopListItem

const SHOPDATA = (INITIALDATA.shopList || []).find(item => item.shopID === SHOPID) || <ShopListItem>{};

找不到.vue文件

添加vue-shim.d.ts文件，用于让用于 TypeScript 识别.vue 文件

vue-shims.d.ts
JavaScript
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
​
​
​
error get-caller-file@2.0.0: The engine "node" is incompatible with this module. Expected version "6.* || 8.* || >= 10.*".

error Found incompatible module

node 版本过低，升级node版本

node -v

sudo n stable

Exceeds maximum line length of 150

eslint 和 tslint 对长度计算不同，tslint 会计算空格之类。将过长的代码换行处理

代码块
JavaScript
eslint 
"max-len": [2, 150, 4, {
    "ignoreUrls": true,
    "ignoreComments": false,
    "ignoreRegExpLiterals": true,
    "ignoreStrings": true,
    "ignoreTemplateLiterals": true
}],
​
tslint
"max-line-length":  [true, {"limit": 150, "ignore-pattern": "^import |^export {(.*?)}"}]
​
​
No inputs were found in config file 'tsconfig.json'

至少要有一个ts文件

Conversion of type 'this' to type 'StatsCommonType' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

代码块
JavaScript
(this as StatsCommonType).queryForm.xxx
​
​
将一种类型强制应用另一种类型，需要先转为 unknown

代码块
JavaScript
(this as unknown as StatsCommonType).queryForm.xxx
​
​
TS 无法直接引用 JS 写的 mixin

目前必须将 mixin 用 TS 改写，并且用 class + decorator 的形式改写；mixin 文件旧代码如果引用了，就必须维护2分代码，一份JS版本，一份TS版本；

六、总结
已有Vue项目的技术栈是 Vue(2.5.17) + Vuex(^3.0.1) + ES6 + ESLint + SonarJS，接入后的情况是 Vue + Vuex + ES6 + TS + ESLint + TSLint + SonarJS + SonarTS。原有项目接入 TypeScript 需要引入 TypeScript(^3.1.6)、TSLint(^5.11.0)、SonarTS。对于已上线的旧代码会慢慢改用TypeScript写，新代码则直接使用TypeScript 写，未来整个项目将完全使用TypeScript进行开发。

TS改造完成后的收益：

通过静态类型检查可以避免不必要的类型错误，减少线上类型错误的bug率

示例：（可能出现报错的地方提示）


提升项目代码的可阅读性

搭配IDE插件，实现代码的友好提示，并且智能提示api

视频演示：（开发过程中，减少开发过程中阅读代码时间，代码的类型提示功能）

00:00
/
00:06
00:00
/
00:36


七、附录
TS 相关文档

官方文档（英） TypeScript in 5 minutes

官方文档（英）Handbook

TypeScript 使用手册（中）

TypeScript 入门教程（中）

参考资料

https://segmentfault.com/a/1190000009247663

https://www.tslang.cn/docs/handbook/declaration-files/introduction.html

https://segmentfault.com/a/1190000011744210

https://juejin.im/post/5b3d4135e51d4519962e7a1e

https://segmentfault.com/a/1190000012486378

https://zhuanlan.zhihu.com/p/29971290

https://www.zhihu.com/question/64147199

https://blog.csdn.net/github_36978270/article/details/78771262

https://www.cnblogs.com/zhuanzhuanfe/p/8596532.html

https://segmentfault.com/a/1190000009247663

https://www.tslang.cn/docs/handbook/declaration-files/introduction.html


专栏：移动 开发技术
iOS 应用的后台启动能力
作者 @朱峰 

背景
通常情况下，iOS 应用是由用户主动点击图标或者推送、Widgets等主动启动的，应用的启动过程对用户来说是全程可见的，即：用户能明显的感知到（看到）应用的启动。这种情况下应用的生命周期大家都十分熟悉。而实际上，应用还可以在“用户感知不到（看不到）”的情况下启动，这就是本文要说的“应用的后台启动”。应用后台启动机制是iOS系统以各种API提供给开发者来使用的，是iOS应用的“保活”的原理，仔细研究”后台启动机制”，能在很多能力上开启新的维度。

生命周期
根据应用启动时是否在前台，可以把启动过程分为“前台启动”和“后台启动”。前台启动就是用户主动点击图标或者推送、Widgets等主动启动应用的过程。后台启动是应用通过各种系统API让应用在某些特定事件发生时，系统在后台启动应用的过程。这两个过程的生命周期是不同的。

前台启动


如上图，

应用前台启动时，先经过main函数，再到UIApplication的didFinishLaunchingWithOptions事件，再到root view controller的viewDidLoad、viewWillAppear和viewDidAppear事件，最后didBecomeActive。

当用户不使用应用后，把应用压入后台，此时发生willResignActive事件和didEnterBackground事件。一般3分钟后（如果有backgroundTask）应用的进程挂起（suspend）。

当用户再次打开应用（点击图标等），会发生willEnterForeground事件和didBecomeActive事件。

这是大家都十分熟练的启动过程。

后台启动


如上图，由于应用后台启动时，用户是无感知的，且应用没有在前台。因此didBecomeActive是不会触发的。

应用后台启动时，仍然是先经过main函数，再到UIApplication的didFinishLaunchingWithOptions事件，再到root view controller的viewDidLoad、viewWillAppear和viewDidAppear事件。但整个过程是在后台进行，用户是感知不到的。

注意，这里不会didBecomeActive了。（从字面意义理解，应用没有在前台，当然就不会Active了）

此时应用的进程会在一定的时间内变为挂起（suspend）状态。（这个时间是我们可控制的，见下文）

当用户点击图标（或其他方式让应用回到前台时），先发生willEnterForeground事件，再发生didBecomeActive事件。

一旦应用回到了前台，后续的事件就与“前台启动”相同了。

更多应用后台运行时的生命周期资料，可参考这个文档 https://developer.apple.com/library/archive/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/BackgroundExecution/BackgroundExecution.html

后台启动的方式
苹果从iOS7开始，引入了Background Fetch机制，开启了应用从后台启动的能力，后续的iOS版本逐步加入了更多机制可以让应用从后台启动。严格来说，如果算上后台音乐播放的能力，iOS6就可以后台启动，一方面是比较久远了，再者音乐播放类应用是一个特殊的应用了，开发者开发时自然就会注意到后台启动的场景。

Background Fetch

Background Fetch 是iOS7开始提供的一个数据拉取机制，主要是用于需要频繁更新内容的应用，例如社交、新闻或者天气应用。当实现了这个机制，系统会学习用户使用应用的习惯，并尽量在用户下次打开应用之前，给应用一个后台启动（或者叫后台唤醒）的机会，让应用提前可以准备数据。例如，如果用户总是在下午1点打开应用，那么系统会学习到这个习惯，并尽量在1点之前触发Background Fetch。

这个机制实现起来很简单。

第一步，在Capacities -> Background Modes 选中 Background fetch。


也就是确保Info.plist中存在UIBackgroundModes，并存在fetch这一项。

代码块
Plain Text
<key>UIBackgroundModes</key>
<array>
<string>fetch</string>
</array>
​
第二步，在AppDelegate中调用-[UIApplication setMinimumBackgroundFetchInterval:]

代码块
Plain Text
[[UIApplication sharedApplication] setMinimumBackgroundFetchInterval:UIApplicationBackgroundFetchIntervalMinimum];
​
setMinimumBackgroundFetchInterval的参数类型是NSTimeInterval，但苹果建议只需要填写UIApplicationBackgroundFetchIntervalMinimum或UIApplicationBackgroundFetchIntervalNever，因为这个最低调用间隔的数值只是建议的数值，最终调度的频率还是系统控制。因此如果要启用Background fetch，传入UIApplicationBackgroundFetchIntervalMinimum；如果要禁用，传入UIApplicationBackgroundFetchIntervalNever。

第三步，实现AppDelegate的application:performFetchWithCompletionHandler:。

代码块
Plain Text
- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{
    completionHandler(UIBackgroundFetchResultNewData);
//    completionHandler(UIBackgroundFetchResultNoData);
//    completionHandler(UIBackgroundFetchResultFailed);
}
​
进入这个回调后，我们可以通过completionHandler告诉系统“后台数据获取准备完成了，系统可以挂起进程了”。当调用completionHandler后，系统会立即挂起进程。

completionHandler的参数有三个UIBackgroundFetchResultNewData、NoData和Failed，这三个结果经过测试目前没发现明显区别，或许只是拿来关联学习用户行为的一个参数。

当应用后台启动（或唤醒）时，completionHandler必须在30秒内调用，否则系统会把进程kill。通过 completionHandler 也就可以控制进程的后台存活时长。

Remote Notifications

当使用APNs（Apple Push Notification service）时，如果推送的字段中包含 下文代码中的content-available ， 则系统会尝试把应用从后台启动或唤醒。

代码块
Plain Text
{
   "aps" : {
      "content-available" : 1
   },
   "demo1" : "bar",
   "demo2" : 42
}
​
类似Background fetch，也需要在 Capacities -> Background Modes 选中 Remote notifications。

实现就是标准的APNs配置，在AppDelegate层面可以实现方法：

代码块
Plain Text
//iOS >=7 && <=9
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{   
}
// iOS >=10
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler{
}
​
这个方法 application:didReceiveRemoteNotification:fetchCompletionHandler:有个类似的方法：application:didReceiveRemoteNotification: ， 不同之处是：application:didReceiveRemoteNotification:fetchCompletionHandler 不仅仅在前台会调用，后台也会。当系统收到这个推送时，还会尝试后台启动或唤醒应用。当然更重要的是completionHandler这个参数，可以用来控制进程后台存活的时长。

详细可参考苹果文档 https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_updates_to_your_app_silently?language=objc

Significant Location Update

当请求地理位置权限时，可以请求“后台定位”的权限，当有后台定位权限时，应用可以调用 CLLocationManager的startMonitoringSignificantLocationChanges方法启用“显著位置变化的监听”，当GPS位置有明显变化时（实际测试一般4、5百米），应用会在后台启动。

首先，需要CLLocationManager请求后台定位权限（Always）权限，

代码块
Plain Text
-[CLLocationManager requestAlwaysAuthorization]
​
当有了Always的权限，应用启动时就可以调用 startMonitoringSignificantLocationChanges 开始监听显著位置变化了。

代码块
Plain Text
-[CLLocationManager startMonitoringSignificantLocationChanges]
​
当调用后，下次地理位置发送显著变化，就会把应用从后台启动，并调用下面的方法：

代码块
Plain Text
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations{
}
​
详细可参考文档 https://developer.apple.com/documentation/corelocation/getting_the_user_s_location/using_the_significant-change_location_service?language=objc

HealthKit

当应用有权限获取健康数据，例如步数时，可以使用HKHealthStore的enableBackgroundDeliveryForType:frequency:withCompletion方法，启用健康数据的后台监听。目前微信、支付宝等互联网应用，多数是获取步数，这些应用就可以通过监听步数变化来实现后台启动。当然，苹果为了用户电量考虑，部分数据会有后台唤醒频率的限制，例如步数最多是一小时一次。


例如，我们要读取用户的步数，并监听步数变化。

第一步，先请求步数的权限。

代码块
Plain Text
    store_ = [[HKHealthStore alloc]init];
    HKObjectType *stepType = [HKObjectType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount];
    HKAuthorizationStatus status = [store_ authorizationStatusForType:stepType];
    switch (status) {
        case HKAuthorizationStatusNotDetermined:{
            NSSet<HKSampleType*> *readTypes = [NSSet setWithArray:@[stepType]];
            [store_ requestAuthorizationToShareTypes:nil readTypes:readTypes completion:^(BOOL success, NSError * _Nullable error) {
                //...
            }];
            break;
        }
        case HKAuthorizationStatusSharingDenied:
        case HKAuthorizationStatusSharingAuthorized:
            //...
        }
    }
​
第二步，监听步数变化。

代码块
Plain Text
    [store_ enableBackgroundDeliveryForType:stepType frequency:HKUpdateFrequencyHourly withCompletion:^(BOOL success, NSError * _Nullable error) {
        if(success){
        }
    }];
​
第三步，执行HKObserverQuery，用来响应步数的变化通知。

代码块
Plain Text
    NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:nowDay endDate:nextDay options:(HKQueryOptionNone)];
    HKObserverQuery *query = [[HKObserverQuery alloc] initWithSampleType:stepType predicate:predicate updateHandler:^(HKObserverQuery * _Nonnull query, HKObserverQueryCompletionHandler  _Nonnull completionHandler, NSError * _Nullable error) {
        // completionHandler
    }];
    [store_ executeQuery:query];
​
详细文档可参考 https://developer.apple.com/documentation/healthkit/hkhealthstore/1614175-enablebackgrounddeliveryfortype 

其他

除了上面说的这几个，还有一些可以触发后台启动的方法，例如蓝牙、音乐、VOIP、Network Extensions等，各有不同的应用场景。如下图：


相同与不同
不同的API都可带来后台启动，有部分相同点，也有少量区别。

所有后台启动的对应回调方法，都存在一种completionHandler。系统为了确保不过多消耗电量，会给应用一个最大的后台存活时间，例如Background fetch最多30秒，其他方式最多1分钟，超过时间应用如果不自己调用completionHandler，系统会直接kill掉进程。

Background fetch和Remote notifications都可通过“设置 - 通用 - 后台应用刷新”关闭。

Significant Location Update 和HKHealthKit 都需要向用户申请权限。

当用户主动杀掉进程时，Background fetch 和Remote notifications 就不会有作用了，只有应用压入后台被系统回收的情况下，才有效。苹果开发者可能认为这种情况，是用户主动放弃了应用的自动刷新功能。

启动优化的新维度
应用的启动速度是每一个大型应用必须要特殊关注的指标，“后台启动”的发现让我们有了一个新的优化维度。

我们关注的应用的启动耗时是“用户感受到的从用户点击图标到首页显示”的耗时，那么应用“前台启动”和“后台启动“有什么不同呢？

前台启动

下图是前台启动时，用户角度和应用角度的启动耗时，可见两者等价。


假设下图圆点是启动要做的所有事情，那么前台启动的过程就是“从头到位全部执行一遍”。


后台启动

下图是后台启动时，用户角度的启动耗时和应用角度的耗时对比。可见，后台启动中，应用有了多余的时间可以执行代码，可用来提前完成应用的启动任务。当用户点击图标时，只需要执行少部分代码。


当有了后台启动，那么我们可以在后台启动完成大部分的启动任务，例如下图灰色圆点是后台任务，绿色圆点是前台启动任务，当用户点击图标回前台时，仅执行小部分启动任务即可。


因此，如果当用户点击图标时，应用已经在后台启动，那么这次启动过程对应用来说，仅仅就是一个“回前台”（willEnterForeground > didBecomeActive）的过程。这将极大的提升用户的启动体验。

注意事项
“后台启动”开启了应用启动的另一个方式，对应用是有很大的影响，有以下注意事项：

iOS系统对进程的管控，让应用的进程有了running、suspend、killed状态。尤其是suspend状态在iOS系统中就是“家常便饭”。“后台启动的各种机制”在让进程后台启动的同时，也会频繁的suspend和resume进程。由于suspend的机率更大，我们写的代码就需要适应这种环境。例如两个时间差的计算，如果开始时间和结束时间之间进程发生了suspend，则导致差值会很大。此外，长连接中的socket也会因为suspend导致服务端假连接概率增大。

每一种后台启动机制，都会有对应的“进程后台最大存活时间”的概念，例如Background Fetch是30秒。运用起后台启动的同时，我们也要对用户手机的电量负责，做好电量的控制。

实现的后台启动机制越多，应用的后台启动越频繁，

如果5次后台启动对应1次用户真正的打开应用，那么原来启动阶段的网络请求会是现在的5倍。

此外，后台启动过程由于是对用户无感知的，网络请求会产生流量。

因此，从服务端压力的角度和用户流量消耗的角度，都需要对后台启动的网络请求进行限制。

代码的业务逻辑层面，例如DAU的计算方式、页面PV/UV的计算方式也需要根据生命周期评估计算的正确性。

应用会存在“后台闪退”，或者叫“无感知闪退”。例如，在用户没有打开应用的情况下，应用后台启动后闪退了，这就是一种对用户”无感知的闪退“。

App Store审核方面，多数后台启动能力都要有对应的业务场景来支撑。Background fetch 和 Remote notifications 不需要特别的关联业务场景，HealthKit 需要获取步数的业务，Significant Location Update 需要后台定位，例如海外业务场景。

总结
应用的后台启动给了应用新的启动方式，给予应用更多执行的时间，就像人类多了一种新的出门的交通工具，带来新的能力的同时也会有风险，但只要仔细评估、适当的使用，就能让我们的应用做到一些以前做不到的事情。

iOS使用工具与策略优化组件发版时间
作者@董尚先 

背景
目前的移动端基本几个人负责一个组件，组件通过CI发版并集成进主工程，是否被发版时间过长所困扰过？

发版是持续集成中的重要一环，操作不当在一些时间节点阻碍工作效率，决定优化时是否会无从下手？

不要自行摸索了，公司内实际已经有很多很高效的工具了，你会用会看吗？

本文主要基于iOS的Hyperloop系统，介绍用工具和策略用两个维度，抽象了标准步骤，提升发版速率，其中的一些思想也可以被其他端借鉴。

工具
工欲善其事必先利其器。

1.MPodfile 脚本

由美团架构平台组开发，支持求子库的根节点，依赖于被依赖等功能，可以直接在终端调用。


2.DependencyNetShow mac app

由外卖侧开发，非常贴心的支持了subpods依赖分析，导出更直观的图形展示。

基于cocoa框架开发，mac app即装即用， 支持显示局部组件的依赖， subpods依赖合并计算或分开计算的功能。


3.Hyperloop时间节点统计

美团迭代工程组开发，在hyperloop发版创建二进制的过程中的buildlog进行处理，并提取时间节点汇总展示。

 图中的数字单位是“秒” 。   附：组件查询链接


4.预编译宏替换工具

NVMainBoard总库由 点评用户平台开发，主要用于App共用属性接口统一

其中NVMainBoardEnvType.h 可使用区分环境的运行时的变量来替换预编译宏。

代码块
Objective-C
#import "NVMainBoard+Convenience.h"
​
[NVMainBoard mainboard].isProductEnv// 生产环境为 true，美团内对应宏 !DEBUG && !TEST
[NVMainBoard mainboard].isStageEnv// 内测环境为 true，美团内对应宏 !DEBUG && TEST
[NVMainBoard mainboard].isDebugEnv// 调试环境为 true，美团内对应宏 DEBUG
[NVMainBoard mainboard].isTestEnv// 非生产环境为 true，即内测+调试环境，美团内对应宏 DEBUG || TEST
​
5.WMScheduler 跨组件方法粒度通信

由外卖侧开发，使用oc 原生的Category特性（配合管控）实现轻量无痕的组件通信工具，在梳理仓库依赖方面有奇效。

具体使用：组件通信标准化解决办法


6.无用import检测工具

由外卖侧开发，checkUnuseImport.sh 脚本工具，主要利用的是clang的编译工具clang-check进行单文件的编译，逐行屏蔽.m文件的import，然后进行编译，如果能够正常编译成功，说明该import是不必须的，

对waimai完整工程全量检测时间半小时左右，一般体量的组件的检测在5分钟左右，正确率非常高。


标准优化步骤
工具已经有了，接下来配合一些策略方法，可以抽象成标准化步骤。

Step1

看发版时间过长是逐渐累加形成的， 还是最近一两次发版突然形成的。 如果是后者，建议直接去对最新几次commit的diff看，不用往下看了。

Step2

如果组件分了子组件，看看所有的子组件是否都是必要的，建议将部分子组件进行合并。

发版的步骤是先挨个发所有的subpods（即子库），每个subpods会根据configuration（Debug、Dailybuild、Release）编译多次，然后再整体打包发一遍。 根据编译日志来看每增加一个子库，直接多了一份拉依赖的时间。 但这只是理想情况，实际上分库还会引发编译时长增加等其他问题。 subpods的出现的场景很多是通过工具来掩盖设计上的缺陷，subpods本不该出现，要不然就是在一起，要不然就是分库。 但是面对大厂的项目 大多存在一些历史包袱，代码与设计不可能100%完美，因此很多时候subpods还是存在的。 我们认为，每个subpods应当是功能独立，依赖库不同的，否则可以尝试合并。

Step3

通过上面的【工具3】，分析仓库的问题在于编译时间过长还是拉依赖的时间较长。

编译时间的长短需要和代码的量级相匹配， 依赖的时长需要与依赖树的体量相匹配。 

具体基线建议使用组件查询工具与自己体量相似的仓库进行对比。

Step4

编译时间过长的主要原因有如下几点

1.代码行数较多

可以通过一行简易的指令计算，如果项目中有很多非.h.m的文件，自行扩展下。

代码块
Objective-C
$find WMAddressKit/Classes  -name "*.*" | xargs wc -l 
​
当文件量级与实际时间不匹配时，可以分析下xcode的buildlog，看每个文件时间均衡，还是有个别文件很慢


2.引入了大量无用import 

随着代码的不断更新换代，当一段代码删了可能import不会删的那么及时，导致编译时产生大量的inclue，可以使用【工具6】检查下自己仓库的无用import。并且删除。

3.大量使用预编译宏

因为多个预编译宏的缘故，发版机器需要满足每种情况，所以会编译多套代码，假设两个预编译宏会两两组合成4套，3个宏会组合成9套。 这也正是之前imeituan不让增加自定义预编译宏的原因，因为会让打包时间成指数级增长。 但是如果把宏去掉，并不会说时间直接缩小了4倍，在编译多套代码时间不是一加一的关系。 了解到美团平台方面给出的测试结果是，所有预编译宏全部去掉build时间最多能减少一半。

所以这里建议使用前面提到的【工具4】进行代码改写。

4.代码量级较大的库使用pch文件

就是hyperloop的逻辑原本是对各个subspec做了隔离（具体的做法是将非自己subpods内的文件换成同名的空文件），例如B-subPods依赖A-subPods，A已经编译过了，那B在编译时理应A特别快就过了。 但如果仓库存在pch文件，会让所有A所有文件再次引入一些头文件，导致每个文件都有时间消耗，当A库的文件数很多时，也会带来很长的时间消耗。 建议将pch文件干掉，在需要的类挨个补依赖。

Step5

拉依赖库时间过长的原因有如下几点

1.如果没有subpods，就是单纯的依赖分析时间很长。

拉依赖库的总时间=依赖分析+各个仓库下载时间+生成相关lock文件时间。 各仓库的下载时间可以统计到，但目前即使通过cocoapods-plugin应该也没法得到一个仓库具体在依赖分析中占用多少时间， 所以建议使用简单粗暴的办法，就是直接使用Hyperloop的【工具3】来配合排查。

普通做法是：开一个测试分支，先把代码全删了，因为在测试拉依赖的时间和代码没关系，还能让每次结果出来的更快一些。  然后使用【工具2】找到该仓库的直接依赖节点。（ 比如有的库是直接依赖5个库，然后这5个库间接依赖了50个）。 测试分支上分开成许多subpods然后发版。 示例结果如下，接下来就能聚焦你该从哪里开始优化了。


2.有subpods，然后Core依赖时间较长

这里简单说就是蝴蝶效应的意思，A库时间要100秒 ，五个库都依赖了A，时间消耗要大于500秒，后续以此类推。 优化Core的效果最为明显。

3.subpods依赖层级较乱

例如一个仓库不太合理的场景是：A是core，B依赖A，C依赖B，D依赖C。   可以尽可能的换成A是Core，B,C,D 都只依赖A。  这几个subpods库的依赖关系设定并不能由那些代码依赖决定，而是要以设计此模块的实际目标决定。  如果依赖库发依赖，可以使用【工具2】关闭字库依赖合并查看结果，下沉依赖关系；如果代码上依赖可使用【工具5】的组件解耦功能； 如果代码和依赖库都强依赖，那思考下这两个subpods是不是直接就应该并成一个？

4.依赖的某库间接依赖了一大串库，导致下载依赖时间变长。

这种场景很多库都有，我们可以通过【工具2】查出哪些依赖库处于这种尴尬的位置， 并在本地剔除后编译看看具体是用到了该库的什么功能，如果仅仅是用到了个别几个很独立的方法或类，可以将这个类复制一份加个前缀， 然后直接剔除后续依赖。我们之前就有过复制了一个工具类然后直接剔除12个依赖库的案例。

总结
以waimaiPlatform为例，代码的体量是11W行。  由于多端复用和动态化等前提，共分为4个subpods。 使用文中除去预编译宏和pch问题 的其他所有方法，从7.4.6版本的46分钟 减少到7.4.10版本的22分钟，可见下图。 目前仓库的build时间还有比较大的优化空间，预编译宏和pch改动的工作量较大需要排期完成，预计可以再现在的基础上再减少50%。


目前iOS的hyperloop系统给各个业务方的发版集成带来了极大的便利。 当出现过慢、超时构建等问题直接去找Hyperloop管理员并不是最好的解决办法，因为他们也不了解特定业务的实际情况， 而当Hyperloop发版正常时其重要性容易又常常被人忽视。所以定期检查，自主的去发现自己仓库的问题与优化是所有组件负责人需要具备的一项素质与能力，希望这篇文章能有所帮助。

行业前沿
  [译] W3C候选规范：Pointer Events 触点事件
翻译：@张啸 

原文来自：W3C 候选推荐 2018年

翻译文章英文原址：https://www.w3.org/TR/2018/CR-pointerevents2-20181211

概述
本规范扩展及修改了Pointer Events的功能特性，这个规范是W3C推荐规范，用来描述为了处理未知的点触硬件设备（包括鼠标、手写笔、触摸屏等）的事件和相关接口。为了兼容现有的基于鼠标的内容标准，本规范也描述了对于其他点触设备类型触发鼠标事件的映射。

介绍
现在，HTML5中有相当多的一部分关于鼠标事件的内容被使用或者被设计。这些鼠标输入的处理通常以自定义的方式被编码为【UIEVENTS】鼠标事件。然而在有着更新的计算设备的今天，就需要去处理其他形式的输入（包括触摸屏、手写输入设备等）。为了分别处理不同形式的输入设备，更多的事件类型被提出。然而当添加新的设备类型支持时，更多的事件类型往往会导致一些不必要的逻辑重复以及更大的事件处理开销。但当编写内容时只考虑一种设备类型也通常会导致兼容性问题。此外，为了兼容现有的基于鼠标的内容，大多数标准实现上会采用为所有输入类型都触发鼠标事件。但是这样会引起歧义，即不能确定鼠标事件是真实鼠标设备触发的还是其他为了兼容性的其他输入设备触发的，这样会导致无法针对这两种不同的设备同时进行编码。

为了降低对多种输入类型进行编码的成本，以及消除解决鼠标事件在多设备上引起的歧义，本标准定义了一种更为抽象的输入形式，称为【pointer】。一个pointer可以是和屏幕接触的任意点，例如鼠标光标、手写笔、触摸（包括多点触摸）以及其他点触设备。无论用户使用何种设备，这种模型都可以更轻松的编写网站和应用程序。对于特定设备才需要处理的情况，此规范还定义了用于检查生成事件的设备类型的属性。该规范的主要目标是提供一组事件和接口，使得可以更轻松地编写跨设备点输入处理程序，同时为了增强体验，也允许针对特定设备进行处理。


图片1 Pointer是与硬件无关的、可以再屏幕上有特定坐标（或坐标集合）的标识

处理通常的点触输入的事件和鼠标处理事件是相似的，例如pointerdown, pointermove, pointerup, pointerover, pointerout等。这有助于编码内容轻松地从鼠标事件迁移到pointer events。Pointer Events提供了所有在鼠标事件中的常用的属性（客户端坐标，目标元素，按钮状态等），除此之外还添加了针对其他形式输入的新属性：压力，接触面，倾斜角等。因此程序员可以轻松编写pointer events的代码，在不同的输入类型上进行逻辑共享，以及可以针对特定设备进行有必要的自定义处理来获得更好的用户体验。

虽然Pointer Events来源于多种输入设备，这些事件并不是为了一些特定设备而定义的事件。尽管可能并鼓励兼容性，本规范不要求特定输入设备规范一定要被支持（例如：mouse events, touch events等）。标准实现者可以仅仅实现pointer events而不用实现其他输入事件。为了兼容用特性鼠标事件进行编码的内容，本规范提供了一个可选的章节来描述怎样基于非鼠标的点触事件去创建【compatibility mouse events https://www.w3.org/TR/2018/CR-pointerevents2-20181211/#dfn-compatibility-mouse-events】兼容性代码。

例子
以下是演示如何使用此规范中的API的示例代码。

例子1：特性检查和事件绑定

代码块
JavaScript
/* 绑定pointer事件或者传统的touch、mouse事件 */
​
if (window.PointerEvent) {
    // 如果支持pointer事件，只监听pointer事件
    target.addEventListener("pointerdown", function(e) {
        // 如有必要，基于e.pointerType来进行不同的逻辑处理
        // 处理不同的touch/pen/mouse行为
        ...
    });
    ...
} else {
    // 传统的touch/mouse事件处理
    target.addEventListener('touchstart', function(e) {
        // 阻止mouse事件和click事件
        e.preventDefault();
        ...
    });
    ...
    target.addEventListener('mousedown', ...);
    ...
}
...
​
例子2：检测输入类型

代码块
JavaScript
window.addEventListener("pointerdown", detectInputType);
​
function detectInputType(event) {
    switch(event.pointerType) {
        case "mouse":
            /* 检测到是鼠标输入 */
            break;
        case "pen":
            /* 检测到时手写笔输入 */
            break;
        case "touch":
            /* 检测到是触摸输入 */
            break;
        default:
            /* pointerType 为空(即没有检测到类型)
            或者是厂商自定义类型 */
    }
}
​
例子3：简单Canvas绘画程序

代码块
JavaScript
<style>
  /* 禁止内部触摸行为（例如移动或者缩放）来将canvas元素上的所有事件都应用于应用程序。*/
  canvas { touch-action: none; }
</style>
​
<canvas id="drawSurface" width="500px" height="500px" style="border:1px solid black;"></canvas>
​
<script>
    var canvas = document.getElementById("drawSurface"),
    context = canvas.getContext("2d");
​
    if (window.PointerEvent) {
        canvas.addEventListener("pointermove", paint);
        if(window.navigator.maxTouchPoints>1)
           // 厂商和硬件支持多点触摸
           ...
    } else {
        // 对于不支持Pointer Events的进行兜底
        canvas.addEventListener("mousemove", paint);
    }
​
    function paint(event) {
        if(event.buttons>0)
           context.fillRect(event.clientX, event.clientY, 5, 5);
    }
</script>
​
例子4：控制元素动态变化成接触面

代码块
JavaScript
<div style="position:absolute; top:0px; left:0px; width:100px;height:100px;"></div>
<script>
window.addEventListener("pointerdown", checkPointerSize);
​
function checkPointerSize(event) {
    event.target.style.width = event.width + "px";
    event.target.style.height = event.height + "px";
}
</script>
​
例子5：利用脚本触发一个非信任pointer evnet

代码块
JavaScript
var event = new PointerEvent("pointerover",
  { bubbles: true,
    cancelable: true,
    composed: true,
    pointerId: 42,
    pointerType: "pen",
    clientX: 300,
    clientY: 500
  });
eventTarget.dispatchEvent(event);
​
术语解释
active buttons state 活动按钮状态

当一个点触事件有一个非零的buttons属性时的状态，即活动按钮状态。对于鼠标事件来说，即鼠标上至少有一个按钮被按下的时候。对于触摸事件来说，即和电子设备有物理接触的时候。对触摸笔来说，即和电子设备有物理接触或者有至少一个按钮被按下并移动的时候。

active pointer 活动的触点

任何的触摸接触、笔尖、鼠标光标或任何可以产生事件的触点。对于一个特定的触点（有唯一的pointerId），如果它能产生额外的事件，则它被认为是活动的。例如：

连接状态的鼠标始终认为是活动状态

屏幕上的触摸认为是活动状态

如果触摸接触点或者笔尖离开了电子设备的感应范围，则认为该触摸点不再是活动状态

canceled event 被取消的事件

通过preventDefault()阻止默认操作的事件，并且在事件处理程序中返回false或【UIEVENTS】和【HTML5】定义的其他方法。

contact geometry 接触面

在电子设备上的一个输入产生的边界框（通常是触摸产生的）。通常是指比单个像素更大的触点像素设备。某些设备并不提供此类数据。

digitizer 电子设备

一种输入传感装置，其表面可以感应直接的输入接触或者近距离的输入接触。最常见的就是可以通过触摸点或者笔尖来感知输入。

hit test 命中检测

一种标准实现者对目标元素触发pointer event的检测程序。通常由触点的位置和目标元素在文档中的视觉布局来决定的。

pointer 触点

与硬件无关的、在屏幕上指向特定坐标（或一组坐标集）的输入设备。例如：鼠标、手写笔、触摸等。

user agent 标准实现程序

一种代理用户执行检索、解释、执行、呈现或者创建内容的程序，比如通常运行在客户端机器上的浏览器、编辑器等。

queue a task 排队任务

将任务添加到相关事件循环的事件任务队列中，如【HTML5】中所定义。

Pointer 事件和接口
PointerEvent 接口

代码块
JavaScript
dictionary PointerEventInit : MouseEventInit {
    long        pointerId = 0;
    double      width = 1;
    double      height = 1;
    float       pressure = 0;
    float       tangentialPressure = 0;
    long        tiltX = 0;
    long        tiltY = 0;
    long        twist = 0;
    DOMString   pointerType = "";
    boolean     isPrimary = false;
};
​
[Constructor(DOMString type, optional PointerEventInit eventInitDict), Exposed=Window]
interface PointerEvent : MouseEvent {
    readonly        attribute long        pointerId;
    readonly        attribute double      width;
    readonly        attribute double      height;
    readonly        attribute float       pressure;
    readonly        attribute float       tangentialPressure;
    readonly        attribute long        tiltX;
    readonly        attribute long        tiltY;
    readonly        attribute long        twist;
    readonly        attribute DOMString   pointerType;
    readonly        attribute boolean     isPrimary;
};
​
pointerId

触发事件的 pointer 的唯一标识符，必须与当前【顶级浏览上下文中】的所有其他 【活动的pointer】 不同。在需要的时候，实现厂商（user agent）可能会从之前的活动 pointers 里回收以前不再使用的 pointerId 值。

注：PointerId 的赋值算法是由具体实现定义的。因此除了作为唯一身份标识，作者不能认为 pointerId 值携带有任何具体的含义。比如说，实现厂商可能按照 pointers 被激活的顺序简单使用从 1 开始的数字给任意活动的 pointer 做标识符 - 但是这些值不能保证是单调递增的。另外一些实现厂商会选择随机且唯一的数字给每个活动的 pointer 做标识符。 然而，在后者的情况下用户代理必须确保分配的 pointerId 在当前页面的生命周期里保持不变，并且新的 pointerId 值是不可预测的（例如，使用加密的强随机算法生成随机值），以最小化用户在不同页面间被唯一识别并且追踪的可能性。

width 宽

Pointer 的接触面的 【CSS 像素宽度】（X轴上的大小）。对于同一个 pointer ，该值会随着每次事件被更新。对于缺少接触面属性的输入设备（比如说传统的鼠标）或者硬件未检测到实际接触几何形状的输入设备，实现厂商必须返回默认值 1。

height 高

Pointer 的接触面的 【CSS 像素高度】（Y轴上的大小）。对于同一个 pointer ，该值会随着每次事件被更新。对于缺少接触面属性的输入设备（比如说传统的鼠标）或者硬件未检测到实际接触几何形状的输入设备，实现厂商必须返回默认值 1。

pressure 压力

归一化后的 pointer 压力值，范围在 [0,1] 区间。其中 0 和 1 分别代表硬件能够检测的最小和最大压力。对于不支持压力的硬件和平台，当处于【活动按钮状态】时，值必须为 0.5，否则为 0。 注意：所有 **pointerup** 事件的压力值都为 0。

tangentialPressure 切向压力

归一化后的切向压力值（也称为桶压）。该值通常由输入设备的额外设备控制（如手写笔上的指轮），范围在 [-1, 1] 区间，0表示控制设备中立状态时的值。部分硬件可能只支持 [0, 1] 范围的正值。对于不支持切向压力的硬件和平台，该值必须为 0。

tiltX X倾斜角

由输入设备（如手写笔）与 Y 轴构成的平面，和 Y-Z 平面之间的夹角。取值在 [-90, 90] 区间，向右倾斜时为正值，向左倾斜为负值。tiltX 可以与 tiltY 一起使用，以表示输入设备偏离于显示设备法线（垂直于显示设备）的方向及角度。 对于未上报倾斜的硬件和平台，该值必须为 0。


图片2 正值的 X倾斜角

tiltY Y倾斜角

由输入设备（如手写笔）与 X 轴构成的平面，和 X-Z 平面之间的夹角。取值在 [-90, 90] 区间，朝向用户时为正值。 对于未上报倾斜的硬件和平台，该值必须为 0。


图片3 负值的 Y倾斜角

twist 旋转角

输入设备围绕自身主轴顺时针旋转的角度，取值范围是 [0, 359] 单位是度。 对于未上报旋转的硬件和平台，该值必须为 0。

pointerType 类型

表示触发事件的设备类型（鼠标，触控笔，触摸板等）。 如果实现厂商要为鼠标、触控笔或触摸输入设备触发一个 pointer event，则 pointerType 的值必须按照下表设置：

触点设备类型

pointerType值

鼠标

mouse

手写笔

pen

触摸

touch

如果实现厂商无法检测到设备类型，则该值必须为空字符串。 如果实现厂商支持上面列出的类型以外的设备类型，则 pointerType 的值应该设置实现厂商前缀，以避免不同类型设备的名称冲突。 未来的规范可以为其他设备类型提供额外的规范值。

isPrimary

标识一个 pointer 是否是当前类型的主 pointer。（译者注：例如我们有五个手指，最先接触屏幕的触点为主 pointer）

注：PointerEvent 接口是从MouseEvent继承的，定义在【UIEVENTS】中，并且被【CSSOM_VIEW】扩展。

Button States 按钮状态

Chorded Button Interactions 组合按钮交互

一些点触设备，例如：鼠标、手写笔，是支持多个按钮的。在鼠标事件模型里，每个按钮按下都会产生一个mousedown和mouseup事件。为了更好的抽象不同硬件设备以及简化跨设备输入编辑，Pointer Events不会重复触发由组合按钮按下而产生的pointerdown和pointerup事件（组合按钮：按下一个按键的的同时已经有另一个按键被按下）。

作为替代，组合按钮的按下会反映到button和buutons属性的变化上。button和buttons属性是继承自MouseEvent接口，并且在语义上和数值上有变化，如下面的叙述。

The button property 按钮属性

当状态变化触发事件的时候，为了在任意pointer event（不仅仅是pointerdown和pointerup）中去识别按钮状态的变化，用button属性就可以用来标识设备按钮。

设备按钮变化

button

上一次事件即不是按钮也不是笔/触摸引起的

-1

鼠标左键，

触摸接触，

笔接触

0

鼠标滚轮键

1

鼠标右键

手写笔桶状按钮

2

鼠标后退X1

3

鼠标前进X2

4

手写笔擦除按钮

5

注：在鼠标拖动期间，button属性的值在pointermove事件中和在mousemove事件中是不同的。例如，当按下鼠标右键并拖动鼠标时，在pointermove事件中button的值为-1，但是在mousemove事件中button的值为2.

The buttons property 按钮组属性

buttons属性是对设备的按钮组状态的一个位掩码表示（和MouseEvent相同，但是在此基础上扩展了一组可能的值）。

设备按钮组状态

buttons

鼠标移动并且没有任何按钮组按下，

手写笔移动并且没有任何按钮组按下

0

鼠标左键，

触摸接触，

笔接触

1

鼠标滚轮键

4

鼠标右键

手写笔桶状按钮

2

鼠标后退X1

8

鼠标前进X2

16

手写笔擦除按钮

32

The Primary Pointer 主触点

在多触点（例如：多点触摸）的情况下，isPrimary属性用来定义在一组活动触点中的主控触点。

在给定的时间内，针对每一种触点类型，最多只有一个主触点。

对于特定触点类型，第一个激活的触点就是这个类型的主触点（例如：在触摸屏上第一个接触的手指所产生的触点就是主触点）。

只有主触点会产生【鼠标事件兼容】。在有多个主触点的情形下，这些主触点都会产生【鼠标事件兼容】。

Firing events using the PointerEvent interface 使用PointerEvent接口触发事件

触发名为e的pointer事件意味着使用PointerEvent接口触发[DOM4]中定义的名为e的事件，该接口的属性按照【PointerEvent Interface】和【Attributes and Default Actions】章节中的内容被定义。

如果事件不是 gotpointercapture 或者 lostpointercapture, 执行【 Process Pending Pointer Capture】章节中的步骤。

以下内容决定事件触发的目标对象：

如果【pointer capture target override 】已经被设定，那么目标对象就赋值给【pointer capture target override 】对象

否则，赋值目标对象给由通常的触发测试机制返回的对象。（这种机制超出了本规范的内容）

如果这是一个pointerdown事件，相关的设备就是直接操作的设备，并且目标是一个Elment，然后设置触点的pointerId到目标元素上，如【 implicit pointer capture】章节内容。

Attributes and Default Actions 属性和默认行为

以下表格中定义了本规范中事件类型的bubbles和cancelable属性以及默认行为。每种事件类型的详情参见【Pointer Event Types】。

事件类型

 Bubbles

Cancelable

默认行为

pointerover

是

是

无

pointerenter

否

否

无

pointerdown

是

是

当时主触点时，默认行为同mousedown；

取消事件也会对这个pointerType设置PRVENT MOUSE EVENT标识，来防止继续触发某些【compatibility mouse events】

pointermove

是

是

当时主触点时，默认行为同mousemove

pointerup

是

是

当时主触点时，默认行为同mouseup

pointercancel

是

否

无

pointerout

是

是

无

pointerleave

否

否

无

gotpointercapture

是

否

无

lostpointercaputre

是

否

无

除了pointerenter和pointerleave以外的以上表格中的事件类型中，composed（【DOM4】）属性值应为true。对于以上表格里的所有事件类型中，detail【UIEVENTS】属性应该为0。

和MouseEvents【UIEVENTS】一样，releatedTarget应在触点刚离开的元素上初始化或者在触点刚进入的元素上初始化。对于其他pointer events，默认值为null。需要注意当一个元素接收触点捕获时，所有下面的触点事件被认为在捕获元素的边界中。

对于gotpointercapture和lostpointercapture，除了上表中定义的属性之外的所有属性应该和引起程序去运行【 Process Pending Pointer Capture】的Pointer Event相同，并且触发gotpointercapture 和 lostpointercapture事件。

Process Pending Pointer Capture 处理等待状态的触点捕获

当隐式释放触点捕获时【implicitly releasing pointer capture】并且触发的触点事件不是gotpointercapture 和 lostpointercapture时，标准实现者需要运行以下步骤：

针对一个触点，如果触点捕获目标覆盖【 pointer capture target override】被设置了，并且不等于等待处理的触点目标覆盖【 pending pointer capture target override】，则在触点捕获目标覆盖【 pointer capture target override】上触发 lostpointercapture 事件。

针对一个触点，如果等待处理的触点目标覆盖【 pending pointer capture target override】被设置了，并且不等于触点捕获目标覆盖【 pointer capture target override】，则在等待处理的触点目标覆盖【 pending pointer capture target override】上触发 gotpointercapture 事件。

设置【pointer capture target override】为【 pending pointer capture target override】，或者清除【pointer capture target override】。

Pointer Event types 触点事件类型
以下是本规范定义的触点事件类型。

在主触点的情形下，这些事件（gotpointercapture 和 lostpointercapture）可以触发【compatibility mouse events】。

pointerover 事件

当一个触点设备进入到一个元素的边界时，标准实现者必须触发pointerover事件 。需要注意setPointerCapture或releasePointerCapture可能更改命中的测试目标，并且在触点被捕获时，它被认为始终在捕获元素的边界内，以便触发边界事件。标准实现者必须优先为不支持hover的设备【devices that do not support hover 】触发pointerdown事件。

pointerenter 事件

当一个触点设备进入到一个元素的边界或者该元素的子节点时（包括不支持hover的设备触发pointerdown事件），标准实现者必须触发pointerenter事件。需要注意setPointerCapture或releasePointerCapture可能更改命中的测试目标，并且在触点被捕获时，它被认为始终在捕获元素的边界内，以便触发边界事件。这个事件类型pointerover类型相似，但是它不会向上冒泡。

pointerdown 事件

当一个触点进入到活动的按钮状态时【active buttons state】，标准实现者必须触发pointerdown事件。对于鼠标，发生的时机是设备从没有按钮按下的状态到至少有一个按钮被按下的状态。对于触摸，发生的时机是当和触摸设备有物理接触的时。对于手写笔，发生时机是和笔触设备有物理接触并且没有任何按钮被按下时，或者当手写笔正在悬停并且从没有按钮被按下到至少有一个按钮被按下的变化时。

对于【devices that do not support hover】不支持悬停的设备，标准实现者必须触发pointerover事件，紧跟着在pointerdown事件前触发pointerenter事件。

pointermove 事件

当触点改变自身位置坐标时，标准实现者必须触发pointermove事件。此外，当触点改变改变按钮状态、压力、切向压力、倾斜角、旋转角以及接触面，并且在这种情况下没有产生其他本规范中定义的触点事件时，标准实现者必须触发pointermove事件。

pointerup 事件

当触点离开【active buttons state】活动按钮状态时，标准实现者必须触发pointerup事件。对于鼠标，发生的时机是设备从至少有一个按钮被按下的状态到没有按钮被按下的状态。对于触摸，发生的时机是当触点和触摸设备的物理接触被移除时。对于手写笔，发生时机是手写笔和设备的物理接触被移除并且没有按钮被按下时，或者当手写笔正在悬停并且从至少有一个按钮按下的状态到没有按钮被按下的状态变化时。

对于【devices that do not support hover】不支持悬停的设备，标准实现者必须触发pointerout事件，紧跟着在pointerup事件后触发pointerleave事件。

pointercancel 事件

在下列情形下，标准实现者必须触发pointercancel事件：

标准实现者决定触点不可能继续产生事件的时候（例如硬件事件引起的）

在触发pointerdown事件之后，如果触点之后被用来操作页面视图的时（例如移动和放大操作）

当触点引起拖动操作时，在【drag operation starts】拖动操作之前立刻触发

在触发pointercancel之后，标准实现者必须触发pointerout事件，紧跟着触发pointerleave事件。

pointerout 事件

在下列情形下，标准实现者必须触发pointerout事件：

触点设备移出元素的命中测试边界。注意setPointerCapture或releasePointerCapture可能已更改命中测试目标，并且在触点被捕获时，它始终位于捕获元素的边界内，以便触发边界事件。

对于【does not support hover】不支持悬停的设备，在触发pointerup事件之后触发

在pointerca事件之后触发

在手写笔离开设备可识别范围内

pointerleave 事件

当触点设备被移出元素（包含其所有子元素）的命中测试范围时（以及不支持悬停的设备发出的pointerup和pointercancel时），标准实现者必须触发pointer event事件。需要注意setPointerCapture或releasePointerCapture可能更改命中的测试目标，并且在触点被捕获时，它被认为始终在捕获元素的边界内，以便触发边界事件。当手写笔离开设备可检测范围内时，标准实现者必须触发pointerleave事件。该事件和pointerout事件类似，但是它不冒泡，并且它必须直到触点设备离开元素及元素子元素边界的时候才会被触发。

gotpointercapture 事件

当一个元素接收到触点捕获时，标准实现者必须触发gotpointercapture事件。该事件在元素接收触点捕获时被触发。随后的事件触发都会在此元素上进行。可以参见【 Setting Pointer Capture】和 【 Process Pending Pointer Capture】章节。

lostpointercapture 事件

标准实现者必须在触点捕获已经触发后触发lostpointercapture事件。这个事件必须在触点捕获之后的事件触发之前触发。该事件发生在被移除触点捕获的元素上。随后的事件遵循命中测试机制（超出本规范范围）来决定事件目标。参见【Releasing Pointer Capture, Implicit Release of Pointer Capture, and Process Pending Pointer Capture】章节。

对 Element 接口的扩展
以下部分描述了对现有【HTML5】中定义的现有Element接口的扩展，以便于设置和释放触点捕获。

代码块
JavaScript
partial interface Element {
​
  void setPointerCapture (long pointerId);
​
  void releasePointerCapture (long pointerId);
​
  boolean hasPointerCapture (long pointerId);
​
};
​
setPointerCapture

对调用此方法的元素`element`【设置触点捕获】，触点是由入参 `pointerId` 标识的触点。对于触点的后续事件，捕获元素将替换正常命中测试元素，就像触点总是在捕获元素上一样。并且后续事件必须始终以此元素为目标，直到捕获被释放。 触点必须处于活动按钮状态时此方法生效才能生效，否则方法将静默失败。 当提供给方法的参数不能标识到任何活动触点的时候，抛出 `NotFoundError` 的 `DOMException`。

releasePointerCapture

对调用此方法的元素【释放触点捕获】，触点是由入参 `pointerId` 标识的触点。触点的后续事件在确定事件目标时遵循正常命中测试机制（超出本规范的范围）。当提供给方法的参数不能标识到任何活动触点的时候，抛出 `NotFoundError` 的 `DOMException`。

hasPointerCapture

标识调用此方法的元素是否被由入参 `pointerId` 标识的触点进行触点捕获。如果 pointerId 的【未决触点捕获目标替代[pending pointer capture target override](https://www.w3.org/TR/2018/CR-pointerevents2-20181211/#dfn-pending-pointer-capture-target-override)】是调用此方法的元素就返回 `true`，否则返回`false`。

对 GlobalEventHandlers 接口的扩展
下面的章节描述了对现有GlobalEventHandlers的扩展，来完成事件处理的注册。

代码块
JavaScript
partial interface GlobalEventHandlers {
    attribute EventHandler ongotpointercapture;
    attribute EventHandler onlostpointercapture;
    attribute EventHandler onpointerdown;
    attribute EventHandler onpointermove;
    attribute EventHandler onpointerup;
    attribute EventHandler onpointercancel;
    attribute EventHandler onpointerover;
    attribute EventHandler onpointerout;
    attribute EventHandler onpointerenter;
    attribute EventHandler onpointerleave;
};
​
ongotpointercapture

gotpointercapture 事件类型的事件处理属性

onlostpointercapture

lostpointercapture 事件类型的事件处理属性

onpointerdown

pointerdown 事件类型的事件处理属性

onpointermove

pointermove 事件类型的事件处理属性

onpointerup

pointerup 事件类型的事件处理属性

onpointercancel

pointercancel 事件类型的事件处理属性

onpointerover

pointerover 事件类型的事件处理属性

onpointerout

pointerout 事件类型的事件处理属性

onpointerenter

pointerenter 事件类型的事件处理属性

onpointerleave

pointerleave 事件类型的事件处理属性

对 Navigator 接口的扩展
Navigator 是定义在[HTML5]中的接口。本规范扩展了Navigator接口来增加对设备检测的支持。

代码块
JavaScript
partial interface Navigator {
    readonly  attribute long maxTouchPoints;
};
​
maxTouchPoints

设备支持的最多同时起作用的触点个数。对于支持多个识别设备的设备（例如：多触摸屏设备），这个值必须是多组中的最大支持触摸个数集合中最大的那个值。

例如：假设一个设备有3个触摸屏，分别支持2，5，10个触摸点。那么maxTouchPointers的值应为10。

默认触摸行为的候选区域声明
对于触摸输入，默认行为和所有触点事件必须不是对视口的操作（例如：对视口的移动或者缩放）。

The touch-action CSS property

名称

touch-action

值

auto | none | [ pan-x || pan-y ] | manipulation

初始值

auto

应用到

所有元素除了：non-replaced inline elements, table rows, row groups, table columns, and column groups

继承

无

Percentages

N/A

Media

visual

Computed value

和value相同

touch-action 这个css属性是用来决定触摸输入是否会触发标准实现者提供的默认行为。这包含但不限于，移动或者缩放。可以参见上方的可取得值。

在执行标准实现者的触摸行为时，标准实现者不能触发接下来的触点事件。为了结束触点的事件流，当下面的点都为true时，标准实现者必须触发pointercancel（包括随后的pointerout事件和一个或多个pointerleave事件）事件：

标准实现者已经决定（通过的方法不在本规范范围）触摸输入已经被消耗掉了，

触点已经触发了pointerdown事件，并且

pointerup或者pointercancel事件（紧随上面提到的pointerdown事件）还没有被触发

Determining supported touch behavior 触摸行为支持

当用户触摸一个元素时，触摸的效果是由touch-action的值决定的，并且在这个元素上以及它的祖先元素上发生的默认的触摸行为如下：

如果触摸行为在元素允许的坐标空间里，触摸行为符合元素的touch-action。需要注意如果CSS变换如果被应用，那么元素的坐标空间会和屏幕的左边空间不同，这可能会引起触摸行为不符合元素的touch-action；举个例子，元素按x轴旋转90度，则关于屏幕来说，元素将平行于屏幕坐标的y轴。

如果触摸行为符合在命中测试元素和它最近的祖先元素之间的每个元素的touch-action属性，则触摸行为的默认行为是被支持的（包括命中的测试元素和有默认触摸行为的元素）

一旦触摸行为开始，一旦标准实现者决定了这个行为是否要处理成需要实现的触摸行为，在触摸行为期间，任何和touch-action值相关的变化都将被忽略。例如，对于一个元素，在pointerdown事件处理中编程去改变touch-action的值，该值从auto变成none，只要触摸点是活动状态，就会回导致程序终止或者抑制任何默认触摸行为。

Details of touch-action values 触摸行为值详情

auto

由标准实现者决定在元素上，触摸是否开始，触摸可以是任意被允许的触摸行为，例如移动或者缩放视口。

none

在元素上禁止触发默认的触摸行为

pan-x pan-y

标准实现者可以使在元素上开始的触摸，仅为了从被列出的值所代表的方向滚动的目的。 一旦开始滚动，即使不允许以相反方向开始的滚动，用户也可以反转该方向。 相反，当滚动被限制为沿单个轴（例如，pan-y）开始时，在滚动期间不能改变轴。

manipulation

标准实现者可以使在元素上开始的触摸，仅为了滚动和连续缩放。其他的被auto支持的行为不再本规范范围内。

例子6：禁止所有触摸行为

代码块
JavaScript
<div style="touch-action: none;">
    这个元素接收所有的触摸引发的pointer events
</div>
​
例子7：仅允许横向移动

代码块
JavaScript
<div style="touch-action: pan-x;">
    当触摸移动不在水平方向上进行时，触发pointer events
</div>
​
例子8：子元素区域禁止触摸行为

代码块
JavaScript
<div style="overflow: auto;">
    <div style="touch-action: none;">
         这个元素接收所有的触摸引发的pointer events
    </div>
    <div>
        在这个元素上的触摸应该会消耗在操作父元素上
    </div>
</div>
​
例子9：直接父元素禁止触摸行为

代码块
JavaScript
<div style="overflow: auto;">
    <div style="touch-action: pan-y;">
        <div style="touch-action: pan-x;">
            这个元素接收所有的触摸引发的pointer events，因为它仅允许水平移动，而中间祖先元素仅允许水平移动，因此，默认触摸行为是被禁止的
        </div>
    </div>
</div>
​
Pointer Capture 触摸捕获
介绍

触摸捕获允许将某个触摸事件重新指向到一个特定元素，而不是由命中检测所确定的触点位置。这在需要像自定义滑块这样的场景下很有用（例如： [HTML5] <input type="range">）。触点捕获可以被设置到滑块的拇指元素上，即使触摸点从拇指元素上滑落，也允许用户控制滑块向前或者向后移动。


图4：自定义滑块滑动。在pointerdown作用在拇指元素上，触摸捕获可以被用来允许用户控制滑块，即使触摸点从拇指元素上滑落。

Setting Pointer Capture 设置触摸捕获

触摸捕获设置需要调用 element.setPointerCapture(pointerId) 方法。当该方法被调用时，标准实现者必须运行以下步骤：

如果当方法调用时，pointerId没有任何的活动触摸点匹配，那么抛出一个名为 NotFoundError 的 DOMException

如果当方法调用时，Element没有被链接【https://dom.spec.whatwg.org/#connected】，则抛出一个名为 InvalidStateError的异常

如果当方法调用时，document 有一个被锁定的元素【https://www.w3.org/TR/2018/CR-pointerevents2-20181211/#bib-pointerlock】，则抛出一个名为 InvalidStateError的异常

如果触摸点不是在【active buttons state】活动按钮状态，则终止此步骤

对于特定的pointerId，设置【pending pointer capture target override】到Element上

Releasing Pointer Capture 释放触摸捕获

触点捕获通过调用 element.releasePointerCapture(pointerId) 来释放。当这个方法被调用时，标准实现者必须运行以下步骤：

如果当方法调用时，pointerId没有任何的活动触摸点匹配，并且这些步骤没有在【implicit release of pointer capture】中进行，则抛出一个名为 NotFoundError 的 DOMException

对于这个pointerId的element，如果 hasPointerCapture 的值是false，则中断此步骤

对于给定的pointerId，如果设定了【pending pointer capture target override】，则清空

Implicit Pointer Capture 隐式触摸捕获

一些输入设备，例如触摸屏，实现了一个隐含的“直接操纵”，即一个触点被设计去在UI元素上主动地显示，因为它是活跃的（提供了一种物理直接接触带来的视觉错觉，而不是通过一种概念的浮动的光标的间接接触）。这样的设备被定义为【 InputDeviceCapabilities.pointerMovementScrolls property】【https://wicg.github.io/InputDeviceCapabilities/#dfn-pointermovementscrolls】，并且有以下的“隐式触摸捕获”的行为。

直接操作设备的行为应该与调用任何pointerdown listeners之前的在目标元素上调用的setPointerCapture的行为完全相同。 hasPointerCapture API 用来决定这一过程是否发生了。如果在下一个触摸事件触发之前releasePointerCapture没有被触发，那么一个 gotpointercapture 事件将会被派发给目标，标识这个捕获是活动的。

Implicit Release of Pointer Capture 隐式释放触摸捕获

在触发 pointerup 或 pointercancel 事件后，标准实现者必须清除【pending pointer capture target override】，然后运行【 Process Pending Pointer Capture】的步骤，如有必要会触发 lostpointercapture 事件。运行完这些步骤后，如果触点支持悬停，还必须发送必要的相应边界事件，以反映触点的当前位置而不进行捕获。

如果标准实现者支持触发 click 事件，并且在隐式释放的情形下，click 和 lostpointercapture 事件会被触发，click 应该在 lostpointercapture 之前触发。

当【pointer capture target override】不在connected 【https://dom.spec.whatwg.org/#connected】，【pending pointer capture target override】和 【pointer capture target override】的节点应该被清除，并且和捕获触点相关的 lostpointercapture 事件应该被触发。

当一个pointer lock 【https://www.w3.org/TR/2018/CR-pointerevents2-20181211/#bib-pointerlock】被应用到一个元素上，如果任何元素被设定成捕获的或者等待被捕获的，标准实现者必须运行这些步骤，就像调用了 releasePointerCapture() 一样。

Compatibility Mapping with Mouse Events 与鼠标事件的兼容性映射

目前现有的绝大多数Web页面仅对鼠标事件进行了编码，以下内容描述了实现厂商为了与本规范兼容，应该如何将通用触点输入映射到鼠标事件。

与鼠标事件的兼容性映射是本规范的可选功能。 建议实现厂商支持该功能，以便与现有的内容实现最佳兼容性。 不支持兼容性鼠标事件的实现厂商仍然建议支持click和contextmenu事件。

在没有特别说明的情况下，任何映射鼠标事件的目标元素应该与相应触点事件的目标元素相同，除非目标不再属于其 ownerDocument 树。 在这种情况下，应该在原始目标的最近的仍然属于其 ownerDocument 树的祖先节点上触发鼠标事件，这意味着为鼠标事件基于新的目标节点构建了新的事件路径 。

作者可以通过取消 pointerdown 事件来阻止某些兼容性鼠标事件的产生。

Tracking the effective position of the legacy mouse pointer 跟踪传统鼠标指针的有效位置

虽然只有主触点可以产生兼容性鼠标事件，但是可以由多个主触点同时处于活动状态，每个触点都会产生自己的兼容性鼠标事件。 由于所有这些兼容性事件对于 MouseEvent 代码来说都来自单个鼠标设备，因此建议实现厂商从单个设备的角度保证兼容性鼠标事件是一致的。 对于鼠标过渡事件（即mouseover，mouseout，mouseenter和mouseleave事件），这意味着每个事件目标的进入/退出状态都是正确有效的。 实现厂商需要通过维护一个文档中‘传统鼠标指针的有效位置’值来保证这一点，如下所示：

在 pointerdown、 pointerup、  pointermove 事件或 window 上的 pointerleave 事件之前，实现厂商应该执行以下步骤：

1. 设置 T 为 pointerdown、 pointerup、  pointermove 事件的派发目标。对于 pointerleave 事件，重设 T 为未设置值。

2. 如果 T 与当前的【传统鼠标指针的有效位置 effective legacy mouse pointer position】相同或者均未设置，则终止所有步骤。

3. 对从当前传统鼠标指针的有效位置移动到  T 的鼠标移动事件，根据[UIEVENTS]触发 mouseover, mouseout, mouseenter 和 mouseleave 事件。需要考虑当前传统鼠标指针的有效位置或者 T 在为窗口外的鼠标位置时，未设置值的情况。

4. 将传统鼠标指针的有效位置设置为 T。

Mapping for devices that support hover 对支持悬停的设备的映射

当实现厂商为支持悬停的设备派发触点事件时，需要执行以下步骤：

1. 如果即将派发的触点事件的 isPrimary 属性为 false，则派发触点事件并且终止所有后续步骤。

2. 如果即将派发的触点事件是 pointerdown、 pointerup、pointermove 事件或 window 上的 pointerleave 事件，派发在【 跟踪传统鼠标指针的有效位置】中描述的兼容的鼠标过渡事件。

3. 派发触点事件。

4. 如果派发的触点事件是 pointerdown 并且是【被取消的事件】，则对当前的设备类型 pointerType 设置 PREVENT MOUSE EVENT 标识。

5. 如果当前的设备类型 pointerType 没有被设置 PREVENT MOUSE EVENT 标识，并且派发的触点事件是：

   -  pointerdown，则触发一个 mousedown 事件。

   - pointermove，则触发一个 mousemove 事件。

   - pointerup，则触发一个 mouseup 事件。

   - pointercancel，则在 window 上触发一个 mouseup 事件。

6. 如果派发的触点事件是 pointerup 或者 pointercancel，则清除当前设备类型 pointerType 的 PREVENT MOUSE EVENT 标识。

Mapping for devices that do not support hover 对不支持悬停的设备的映射

某些设备（例如大多数触摸屏）不支持在非活动状态时悬停在某个坐标（或一组坐标）。 现有的许多基于鼠标事件的代码都是假设是鼠标触发的事件，因此某些特性通常是正确的：

输入设备可以独立于激活状态进行悬停（例如，在没有按下任何按钮的情况下移动鼠标光标）。

输入设备很可能会在点击元素之前在元素上生成 mousemove 事件。

这要求实现厂商为这些类型的输入设备提供不同的映射。 当实现厂商要为不支持悬停的设备派发触点事件时，它需要执行以下步骤：

1. 如果即将派发的触点事件的 isPrimary 属性为 false，则派发触点事件并且终止所有后续步骤。

2. 如果即将派发的触点事件是 pointerover 并且当前触点的 pointerdown 事件还未被派发，则触发一个 mousemove 事件 (为了兼容基于传统鼠标的代码).

3. 如果即将派发的触点事件是 pointerdown, pointerup or pointermove 事件或 window上的 pointerleave 事件，派发在【 跟踪传统鼠标指针的有效位置】中描述的兼容的鼠标过渡事件。

4. 派发触点事件。

5. 如果派发的触点事件是 pointerdown 并且是【被取消的事件】，则对当前的设备类型 pointerType 设置 PREVENT MOUSE EVENT 标识。

6. 如果当前的设备类型 pointerType 没有被设置 PREVENT MOUSE EVENT 标识，并且派发的触点事件是：

pointerdown，则触发一个 mousedown 事件。

pointermove，则触发一个 mousemove 事件。

pointerup，则触发一个 mouseup 事件。

pointercancel，则在 window 上触发一个 mouseup 事件。

7. 如果派发的触点事件是 pointerup 或者 pointercancel，则清除当前设备类型 pointerType 的 PREVENT MOUSE EVENT 标识。

原文链接：Pointer Events 触点事件


