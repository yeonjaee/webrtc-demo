import * as http from 'http';
import express from 'express';
import ws from 'ws';
import { Server } from 'socket.io';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);


// const wss = new ws.WebSocketServer({ httpServer });
// const sockets = [];
//
// /* const socket */
// wss.on('connection', (socket) => {
//   sockets.push(socket);
//   console.log('A new WebSocket connection has been established');
//   socket.on('close', () => console.log('Disconnected from the Browser ❌'));
//   socket.on('message', (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case 'new_message':
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//         break;
//       case 'nickname':
//         socket['nickname'] = message.payload;
//     }
//   });
// });

httpServer.listen(3000, () => {
  console.log('HTTP and WebSocket httpServer running on http://localhost:3000');
});