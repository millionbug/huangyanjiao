function deepClone(obj) {
  if (!obj) throw new Error('arguments must be a object');
  let nodeArr = [];
  let reArr = [];
  function clone(obj) {
    let index = nodeArr.indexOf(obj);
    if (index >= 0) {
      return reArr[index];
    }
    if (obj.__proto__.constructor === Array) {
      let re = [];
      nodeArr.push(obj);
      reArr.push(re);
      obj.forEach(o => re.push(clone(o)));
      return re;
    }
    if (typeof obj === 'object') {
      let re = {};
      nodeArr.push(obj);
      reArr.push(re);
      Object.keys(obj).forEach(key => {
        re[key] = clone(obj[key]);
      })
      return re;
    }
    return obj;
  }
  return clone(obj);
}

let a = {};
a.b = {};
a.b.c = a;

let aa = deepClone(a);

let b = {
  b1: [1, 2, 3, {name: 'b1'}],
  b2: {
    name: 'b2'
  },
  b3: {
  }
}
b.b3 = b.b2;
b.b3.ref = b;
let bb = deepClone(b);

