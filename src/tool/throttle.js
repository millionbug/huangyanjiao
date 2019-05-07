export default function throttle(fn, options) {
  let {timeout, first} = options;
  let timere = timeout;
  let timer;
  let oldDate = new Date().valueOf();
  if (first) {
    fn();
  }
  function run() {
    if (timer) {
      clearTimeout(timer)
    }
    let newDate = new Date().valueOf();
    if ((newDate - oldDate) > timeout) {
      fn();
      oldDate = newDate;
      timere = timeout;
    }
    timer = setTimeout(fn, timere);
  }
  
  return {
    run,
    close: function() {
      clearTimeout(timer);
    }
  }
}
//let i = 0; let boundfn = throttle(_ => console.log(i++), {timeout: 2000}); onmousemove = boundfn.run