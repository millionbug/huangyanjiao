let ws = require('ws')
let wsMap = []

function notifyWs(msg, index) {
  wsMap.forEach((ws, i) => {
    console.log('🍓', msg)
    // if (index === i) return
    ws.send(`${msg} from node.js server ${new Date()}`)
  })
}

module.exports = function(server) {
  let wss = new ws.Server({
    server
  });
  wss.on('connection', ws => {
    let index = wsMap.push(ws) - 1
    ws.on('message', msg => {
      wsMap.forEach((ws, i) => {
        console.log('🍓', msg)
        if (index === i) return
        ws.send(`${msg} from node.js server ${new Date()}`)
      })
    })  
  })
}