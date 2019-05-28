export default function () {
  window.onerror = function() {
    console.log(...arguments, 'wondow.onerror catched')
  }
}