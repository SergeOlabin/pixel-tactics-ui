import { io } from 'socket.io-client';

export const socket = io('ws://localhost:80/chat', {
  transports: ['websocket'],
});

socket.connect();

socket.on('connect', () => {
  // either with send()
  socket.send('Hello!');

  // or with emit() and custom event names
  socket.emit('msgToServer', 'Hello!',
  //{ 'mr': 'john' }, Uint8Array.from([1, 2, 3, 4])
  );
});
