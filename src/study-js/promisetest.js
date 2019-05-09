let PENDING = 'pending';
let RESOLVED = 'resolved';
let REJECT = 'rejected'

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
    
    return new Promise((res, rej) => {
      this.resolveCallback.push((value) => {
        setTimeout(() => {
          let x = res(resolve(value))      
          if (x.then) {
            x.then(res, rej)
          }
          
        })
      });
      this.rejectCallback.push((value) => {
        setTimeout(() => {
          let x = rej(reject(value))
          if (x.then) {
            x.then(res, rej)
          }
        })
      });
      // switch(this.status) {
      //   case PENDING: ;break;
      //   case RESOLVED: res(this.data);break;
      //   case REJECT: rej(this.data);break;
      // }
    })
  }
  resolve(value) {
    this.status = RESOLVED;
    this.data = value;
    if (this.resolveCallback[0])
    if (typeof this.data.then === 'function') {
      this.data.then()
    }
    this.resolveCallback[0](this.data)
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
    console.log(2)
    resolve(3)
  }, 0)
}).then(value => {
  console.log(value)
  return 4
}).then(value => {
  console.log(value)
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(5)
    }, 0)
  })
}).then(value => {
  console.log(value)
})
console.log(4)
