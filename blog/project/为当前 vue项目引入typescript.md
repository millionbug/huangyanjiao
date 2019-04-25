
1.安装typescript：yarn add typescript —dev
2.安装ts-loader: yarn add ts-loader —dev
3.在webpack.config.js中声明，需要为ts文件的加载使用ts-loader:
```javascript
{
test: /\.ts$/,
exclude: /node_modules/,
enforce: 'pre',
loader: 'ts-loader'
}
```

4.在web pack.config.js中的resolve的extensions中添加 “.ts”,让你import文件的时候不需要写出后缀名来
5.添加tsconfig.json文件到当前项目的根目录中：
```javascript
{
"compilerOptions": {
"strict": true,
"module": "es2015",
"moduleResolution": "node",
"target": "es5",
"allowSyntheticDefaultImports": true,
"noImplicitAny": false, 
"lib": [
"es2017",
"dom"
]
},
"exclude": ["node_modules"],
}
```
注释：引入superagent包的时候报错，无法找到superagent的说明文件，引入这个放在tsconfig.json的compilerOptions中解决
```javascript
"allowSyntheticDefaultImports": true
```


6.支持在.vue文件中的script标签中写ts：
在webpack.config.js中添加
```javascript
{
test: /\.tsx?$/,
loader: 'ts-loader',
exclude: /node_modules/,
options: {
appendTsSuffixTo: [/\.vue$/],
}
},
{
test: /\.vue$/,
loader: 'vue-loader',
options: {
loaders: {
ts: [
{
loader: 'ts-loader',
options: {
appendTsSuffixTo: [/\.vue$/]
}
}]
},
options: {
esModule: true
}
}
},
```
覆盖掉原有的.vue文件的加载规则