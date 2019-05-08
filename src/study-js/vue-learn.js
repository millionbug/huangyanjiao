//绑定data值进行渲染

//compiler函数解析template模版，然后输出生成div的函数


//渲染函数中每次对this的取值都会生成一个watcher，这个watcher再被添加到被observe
//观察的属性的dep中
function compiler (template) {
  if (!template) return;
  if (typeof template === 'string') {
    return document.createTextNode(template);
  }
  let el = document.createElement(template.tag);
  for (let key in template.attrs) {
    el.setAttribute(key, template.attrs[key]);
  }
  if (template.childrens && template.childrens.length) {
    template.childrens.forEach(child => {
      el.appendChild(compiler(child));
    })
  }
  return el;
}

let uid$1 = 0;

function Dep() {
  this.subs = [];
  this.id = uid$1++;
}

let Target = null;

Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
}

Dep.prototype.notify = function() {
  this.subs.forEach(sub => {
    sub && sub.update();
  })
}

function Watcher(vm, expOrFn, cb) {
  this.vm = vm;
  this.getter = expOrFn;
  this.cb = cb;
  this.depIds = [];
  this.value = this.get(); //不太懂
}

Watcher.prototype.get = function() {
  Target = this; //这里是在表示收集依赖过程中
  let value = this.getter.call(this.vm);
  Target = null; //收集依赖结束
  return value;
}

Watcher.prototype.update = function() {
  let value = this.get();
  // if (this.value !== value) {
  //   this.value = value;
  // }
}

Watcher.prototype.addDep = function(dep) {
  let id = dep.id;
  if (this.depIds.indexOf(id) === -1) {
    this.depIds.push(id);
    dep.addSub(this) //发布者记录这个订阅者    
  }
}

function initData(vm) {
  let data = vm.data;
  if (typeof data === 'function') {
    data = data();
  }
  Object.keys(data).forEach(key => { //key is city

    let dep = new Dep();
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get() {
        if (Target) {
          Target.addDep(dep) //订阅这个key
          // dep.addSub(Target)
        }
        return data[key];
      },
      set(value) {
        data[key] = value;
        dep.notify();
      }
    })
  })
}

function Vue(options) {
  //这里应该生成一个vue实例才对的，然后这个实例调用自身mount方法装载到页面
  if (!(this instanceof Vue)) {
    return new Vue(options);
  }
  this.el = options.el;
  this.data = options.data;
  this.render = options.render;
  this.template = options.template;
  initData(this)

  return this;
}

Vue.prototype.patch = function(vnode) {
  let oldVnode = this.$el;
  let parent = oldVnode.parentNode;
  parent.insertBefore(vnode, oldVnode);
  parent.removeChild(oldVnode);
  this.$el = vnode;
}

Vue.prototype.mount = function(el){
  let vm = this;
  vm.$el = el;
  new Watcher(vm, function(){
    vm.patch(vm.render());
  })
}

let app = new Vue({
  data() {
    return {
      city: '北京',
      action: '欢迎',
      role: '你'
    }
  },
  render() {
    return compiler({
      tag: 'div',
      attrs: {
        'class': 'container'
      },
      childrens: [{
        tag: 'span',
        attrs: {
          'class': 'span1'
        },
        childrens:[this.city]
      },{
        tag: 'span',
        attrs: {
          'class': 'span2'
        },
        childrens:[this.action]
      },{
        tag: 'span',
        attrs: {
          'class': 'span3'
        },
        childrens:[this.role]
      }]
    });
  }
})

app.mount(document.getElementById('app'));
