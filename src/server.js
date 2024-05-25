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

wsServer.on('connection', (socket) => {
  socket.on('enter_room', (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done('hello from the backend');
    }, 1000);
  });
});
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

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);