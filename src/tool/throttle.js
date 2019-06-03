export default function throttle(fn, options) {
  let {timeout, first} = options;
  let timere = timeout;
  let timer;
  let oldDate = new Date().valueOf();
  function run(e) {
    if (timer) {
      clearTimeout(timer)
    }
    if (first) {
      fn.call(this, e);
      first = false;
    }
    let newDate = new Date().valueOf();
    if ((newDate - oldDate) > timeout) {
      fn.call(this, e);
      oldDate = newDate;
      timere = timeout;
    } else {
      timere = oldDate + timeout - newDate;
    }
    let context = this;
    timer = setTimeout(function() {
      fn.call(context, e) //vue中非常重要，有点复杂执行上下文
    }, timere);
  }
  
  return {
    run,
    close: function() {
      clearTimeout(timer);
    }
  }
}
//let i = 0; let boundfn = throttle(_ => console.log(i++), {timeout: 2000}); onmousemove = boundfn.run