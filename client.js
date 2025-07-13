import WebSocket from 'ws';
const address = process.env.ADDRESS;
const ws = new WebSocket(address);

ws.on('open', () => {
  console.log(`Połączono z ${address}`);
});

ws.on('message', (data) => {
  console.log('Otrzymano wiadomość od serwera:', data.toString());
});

ws.on('close', () => {
  console.log('serwer został rozłączony');
  ws.terminate()
});

ws.on('error', (err) => {
  console.error('Błąd klienta:', err);
});
