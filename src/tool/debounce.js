export default function debounce(fn, option) {
  let {first, time = 500} = option;
  if (first) {
    fn();
  }
  let timer;
  function run(e) {
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn(e)
    }, time);
  }
  return {
    run,
    close: function() {
      clearTimeout(timer);
    }
  }
}