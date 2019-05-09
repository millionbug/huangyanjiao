使用extends继承的情况下，
1.data必须为
```javascript
data( ) {
    return {}
}
```
的函数形式；并且结果类似：
Data = Object.assign(ParentData, ChildrenData)
2.methods属性的继承，会是子类完全覆盖掉父类的方法。
```javascript
Children = {
    Methods: {
        Name() {console.log(‘children’)}
    }
}
Parent = {
    Methods: {
        Name () {console.log(‘parent’)}
    }
}
```
结果会是’children’