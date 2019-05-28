React

1 Redux
1.1 什么是redux中间件？常见的中间件有哪些？
参考答案：

redux中间件是提供第三方插件的模式，自定义拦截 action -> reducer 的过程。变为 action -> middlewares -> reducer 。

这种机制可以让我们改变数据流，实现如异步 action ，action 过滤，日志输出，异常报告等功能。

常见的中间件：

redux-logger：提供日志输出

redux-thunk/redux-saga：处理异步操作

redux-promise：处理异步操作，actionCreator的返回值是promise

1.2 redux有何缺点
参考答案：

1.一个组件所需要的数据，必须由父组件传过来，而不能像flux中直接从store取。

2.当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新render，可能会有效率影响，或者需要写复杂的shouldComponentUpdate进行判断。

1.3 考虑到项目长期迭代代码越来越多，如何更加合理的使用redux，或者如何避免复杂混乱的redux代码？
2 React
2.1 生命周期
参考答案：

初始化：

getDefaultProps:获取实例的默认属性

getInitialState:获取每个实例的初始化状态

componentWillMount：组件即将被装载、渲染到页面上

render:组件在这里生成虚拟的DOM节点

componentDidMount:组件真正在被装载之后

运行中：

componentWillReceiveProps:组件将要接收到属性的时候调用

shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回false，接收数据后不更新，阻止render调用，后面的函数不会被继续执行了）

componentWillUpdate:组件即将更新不能修改属性和状态

render:组件重新描绘

componentDidUpdate:组件已经更新

销毁：

componentWillUnmount:组件即将销毁

2.2 在生命周期中的哪一步你应该发起 AJAX 请求？
参考答案：

我们应当将AJAX请求放到 componentDidMount 函数中执行，主要原因：

React 下一代调和算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到 componentWillMount 的触发次数。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount。如果我们将 AJAX 请求放到 componentWillMount 函数中，那么显而易见其会被触发多次，自然也就不是好的选择。

如果我们将 AJAX 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应。如果我们的数据请求在组件挂载之前就完成，并且调用了setState函数将数据添加到组件状态中，对于未挂载的组件则会报错。而在 componentDidMount 函数中进行 AJAX 请求则能有效避免这个问题。

2.3 React性能优化是哪个周期函数？
参考答案：

shouldComponentUpdate 这个方法用来判断是否需要调用render方法重新描绘dom。

因为dom的描绘非常消耗性能，如果我们能在shouldComponentUpdate方法中能够写出更优化的dom diff算法，可以极大的提高性能。

2.4 为什么虚拟DOM会提高性能？
参考答案：

虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。

具体实现步骤如下：

用 JavaScript 对象结构表示 DOM 树的结构

然后用这个树构建一个真正的 DOM 树，插到文档当中

当状态变更的时候，重新构造一棵新的对象树

然后用新的树和旧的树进行比较，记录两棵树差异

把所记录的差异应用到所构建的真正的DOM树上，视图就更新了

2.4 Diff算法？

