let target = document.querySelector('input[value="百度一下"]')
let targetLeft, targetTop
let random = 200
let maxLeft, maxTop
function preventDefaultJump(e) {
  if (e.key.toString().toUpperCase() === 'ENTER' || target === document.activeElement) {
    e.preventDefault()
  }
}
function figureRandom(value, max) {
  let temp = (Number(Math.random().toFixed(1)) * random + 70) * (Math.random() > 0.5 ? 1 : -1);
  if (value + temp > max) {
    temp = temp * (-1)
  }
  value += temp
  return Math.abs(value)    
}
function jumpJoke(e) {
  let style = {}
  let computedStyle = getComputedStyle(target)
  if (computedStyle.position !== 'fixed') {
    target.style.position = 'fixed'
  }
  computedStyle = getComputedStyle(target)
  let cssText = ''
  maxLeft = window.innerWidth
  maxHeight = window.innerHeight
  targetLeft = computedStyle.left ? +computedStyle.left.slice(0, -2) : 0
  targetTop = computedStyle.top ? +computedStyle.top.slice(0, -2) : 0

  
  style.left = figureRandom(targetLeft, maxLeft) + 'px'
  style.top = figureRandom(targetTop, maxHeight) + 'px'
  for(let key in style) {
    cssText += key + ': ' + style[key] + ';' 
  }
  target.style.cssText += cssText
}
function removeEffectiveInput() {
  let input = document.createElement('input')
  input.className = 's_ipt'
  let effectiveInput = document.querySelector('#kw')
  let parent = document.querySelector('.bg.s_ipt_wr.quickdelete-wrap')
  parent.replaceChild(input, effectiveInput)
}
window.addEventListener('keydown', preventDefaultJump)
window.addEventListener('keypress', preventDefaultJump)
window.addEventListener('keyup', preventDefaultJump)

removeEffectiveInput()
target.addEventListener('mouseover', jumpJoke)
