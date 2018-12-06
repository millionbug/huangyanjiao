let fs = require('fs')
let proto = {}

function delegateSetter (property, name) {
  proto.__defineSetter__(name, function (val) {
    this[property][name] = val
  })
}

function delegateGetter (property, name) {
  proto.__defineGetter__(name, function () {
    return this[property][name]
  })
}

let requestSetter = []
let requestGetter = ['query']

let responseSetter = ['status', 'body']
let responseGetter = responseSetter.concat()
requestSetter.forEach(val => {
  delegateSetter('request', val)
})
requestGetter.forEach(val => {
  delegateGetter('request', val)
})
responseGetter.forEach(val => {
  delegateGetter('response', val)
})
responseSetter.forEach(val => {
  delegateSetter('response', val)
})

proto.redirect = function (url) {
  this.type = 'html'
  this.body = `
    Redirecting to <a id="redirect" href="${url}">${url}'</a>.
    <script>document.getElementById('redirect').click()</script>
  `
}

proto.render = function (url) {
  this.type = 'html'
  this.body = fs.readFileSync(process.cwd() + url).toString()
}

module.exports = proto
