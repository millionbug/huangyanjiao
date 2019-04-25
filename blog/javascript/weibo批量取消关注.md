```javascript

let doms = document.querySelectorAll('.layer_menu_list')
let d, index = 2, len = doms.length
async function cancelFollow() {
let d = doms[index]
if (index >= 2 && (index % 2 === 0)) {
d.style.display = 'block'
let as = d.querySelectorAll('a')
as[2].click()
await new Promise(function (resolve) {
setTimeout(function() {
let button = document.querySelector('.W_layer_btn.S_bg1')
button.querySelector('a[node-type="ok"]').click()
resolve()
}, 1000)
})
await new Promise(function (resolve) {
setTimeout(_ => {
resolve()
}, 2500)
})
}
if (index < len) {
index++
cancelFollow()
}
}
cancelFollow()

```