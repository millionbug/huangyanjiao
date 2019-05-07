###client
```javascript
let ws = new WebSocket("ws://localhost:3000");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};
```

###node.js koa
```javascript

let ws = require('ws')

let server = app.listen(port , _ => console.log('running in localhost:3000'))

let wss = new ws.Server({
  server
});
let talk = new Promise(function(resolve, reject) {
  wss.on('connection', ws => {
    resolve(ws)
  })
})
.then(ws => {
  console.log('🍓 ws conencted resolve')
  ws.on('message', msg => {
    console.log('🍎 ws on message  ')
    ws.send(`${msg} from node.js server ${new Date()}`)
  })  
})
```