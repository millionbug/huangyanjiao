let PENDING = 'pending';
let RESOLVED = 'resolved';
let REJECT = 'rejected'

function resolvePromise(promise, x, resovle, reject) {
  if (promise === x) {
    throw new Error('must be a new promise');
  }
  let then;
  if (x && x.then && typeof x.then === 'function') {
    then = x.then;
    let temp = then()
  }
}

class Promise {
  constructor(fn) {
    this.status = 'pending';
    this.values = null;
    this.resolveCallback = [];
    this.rejectCallback = [];
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch(err) {
      // return new Promise((resolve, reject) => reject(err))
    }
  }
  then(resolve, reject) {
    let self = this;
    return new Promise(function(res, rej) {
      switch(self.status) {
        case PENDING:
          self.resolveCallback.push(function(value) {
            setTimeout(() => {
              let x = resolve(value)      
              if (x && x.then) {
                resolvePromise(this, x, res, ref)
              }
            })
          });
          self.rejectCallback.push(function(value) {
            setTimeout(() => {
              rej(reject(value))
            })
          });break;
        case RESOLVED: 
          setTimeout(function() {
            let x = res(resolve(this.data))      
            if (x.then) {
              x.then(res, rej)
            }
          });break;
        case REJECT: 
          setTimeout(function() {
            let x = rej(reject(this.data))      
            if (x.then) {
              x.then(res, rej)
            }
          });break;
      }
    })
  }
  resolve(value) {
    this.status = RESOLVED;
    this.data = value;
    if (this.resolveCallback[0]) {
      if (typeof this.data.then === 'function') {
        this.data.then()
      }
      this.resolveCallback[0](this.data)
    }
  }
  reject(err) {
    this.status = REJECT;
    this.data = err;
    setTimeout(() => {
      if (this.rejectCallback[0])
      this.rejectCallback[0](this.data)
    })
  }
}

console.log(1)
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(3)
    resolve(4)
  }, 0)
}).then(value => {
  console.log(value)
  return 5
}).then(value => {
  console.log(value)
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(6)
    }, 0)
  })
}).then(value => {
  console.log(value)
})
console.log(2)

//then方法的操作是将then的参数插入promise的callback列表中。
//然后返回新的promise. 如果then中resovled的函数返回的是promise就需要
//执行其then方法，如果是递归的promise则需要递归
//