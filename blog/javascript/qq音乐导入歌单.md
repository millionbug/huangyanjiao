[p]qq音乐没有导入歌单的能力，只好手动把网易云的歌单给爬下来，然后单个导入。有两点需要注意
1.找到所有事件需要触发的节点
```js
//修改搜索框
document.querySelector(‘input[placeholder="搜索关键字"]').value = 'nihao'
//点击搜索按钮
ocument.querySelector('[placeholder="搜索关键字"]').parentNode.children[1].click()
//获取第一首歌曲
arr = document.querySelectorAll('.songlist__list .songlist__item')
//添加到歌单按钮
arr[0].querySelector("a[title='添加到歌单']”)
//选中具体的歌单
document.querySelector("a[title='尝试手动录入歌单']”)
```
2.搜索歌曲之后，考虑到网络延迟，希望代码能够静默一秒钟再执行，js执行静默操作
```javascript
function sleep(ms) {
  return new Promise(function(resolve, reject){
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
async function test() {
  await sleep(1000)
}
test()
```
### 完整运行
```javascript
let str = `年度之歌,苦瓜,夕阳无限好,花樽与花,一丝不挂,无人之境`;
let arr = str.split(',')
function sleep(ms) {
  return new Promise(function(resolve, reject){
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
async function gotS(song) {
  console.log(song)
  document.querySelector('input[placeholder="搜索关键字"]').value = song
  document.querySelector('input[placeholder="搜索关键字"]').parentNode.children[1].click()
  await sleep(1000) //静默一秒
  let item = document.querySelectorAll('.songlist__list .songlist__item')[0]
  item.querySelector("a[title='添加到歌单']").click()
  await sleep(1500) //静默一秒
  document.querySelector("a[title='尝试手动录入歌单']").click()
  await sleep(1500) //静默一秒  
  return
}
async function songsMap(arr) {
  while(arr.length) {
    let song = arr.shift()
    await gotS(song)
  }
}
songsMap(arr)
```