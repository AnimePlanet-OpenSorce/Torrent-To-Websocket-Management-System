import { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Klient połączony z Serwerem!');

  setInterval(function ping() {
  ws.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

  ws.on('message', (message) => {
    console.log('Serwer otrzymał wiadomość:', message.toString());
  });

  ws.on('close', () => {
    console.log('Klient rozłączony');
    ws.terminate();
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

console.log(`Serwer uruchomiony na porcie ${PORT}`);
