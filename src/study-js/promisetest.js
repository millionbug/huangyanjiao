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
      setTimeout(fn(this.resolve.bind(this), this.reject.bind(this)))
    } catch(err) {
      // return new Promise((resolve, reject) => reject(err))
    }
  }
  then(resolve, reject) {
    this.resolveCallback.push(resolve);
    this.rejectCallback.push(reject);
    return new Promise(function(res, rej) {
      switch(this.status) {
        case PENDING: ;break;
        case RESOLVED: res(this.data);break;
        case REJECT: rej(this.data);break;
      }
    })
  }
  resolve(value) {
    this.status = RESOLVED;
    this.data = value;
    if (this.resolveCallback[0])
    this.resolveCallback[0](this.data)
  }
  reject(err) {
    this.status = REJECT;
    this.data = err;
    if (this.rejectCallback[0])
    this.rejectCallback[0](this.data)
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
  return 5
}).then(value => {
  console.log(value)
})
console.log(4)
