const WebSocket = require('ws')

const wss = new WebSocket.WebSocketServer({port: 8888});

wss.on('error', console.error);

wss.on('open', function open() {
  console.log('open')
});

wss.on('message', function message(data) {
  console.log('received: %s', data);
});

wss.on('close', () => {
  console.log('close')
})

wss.on('connection', function connection(ws) {
  console.log('connect ws')
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const message = data.toString()
    wss.clients.forEach(client => {
      client.send(message)
    })
  });
});
