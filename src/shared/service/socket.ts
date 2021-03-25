import { io } from 'socket.io-client';

const socketUrl = 'ws://localhost:3002/chat';

export const chatSocket = io(socketUrl, {
  transports: ['websocket'],
  autoConnect: false,
});
