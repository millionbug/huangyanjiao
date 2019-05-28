class LazyMan {
  constructor() {
    this.data = '';
    this.callBack = [];
    this.status = true;
  }
  print(str) {
    this.callBack.push(() => console.log(str))
    this.run()
  }
  sleep(time) {
    this.status = false;
    this.print('wakeup after ' + time)
    setTimeout(() => this.resolve(), time * 1000)
    return this;
  }
  eat(food) {
    this.print('eat' + food)
    return this;
  }
  resolve() {
    this.status = true
    this.run()
  }
  run() {
    while ((this.status === true) && this.callBack.length) {
      let fn = this.callBack.shift()
      fn()
    }
  }
}
let hank = new LazyMan()
hank.sleep(3).eat('dinner')