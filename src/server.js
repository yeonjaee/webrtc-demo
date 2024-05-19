import express from 'express';
import ws from 'ws';
import * as http from 'http';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const server = http.createServer(app);
const wss = new ws.WebSocketServer({ server });

wss.on('connection', (socket) => {
  console.log('A new WebSocket connection has been established');
  socket.on('close', () => console.log('Disconnected from the Browser ❌'));
  socket.on('message', (message) => {
    console.log(message);
  });
  socket.send('hello!!!');
});

server.listen(3000, () => {
  console.log('HTTP and WebSocket server running on http://localhost:3000');
});