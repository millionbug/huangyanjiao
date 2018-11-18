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

module.exports = proto
