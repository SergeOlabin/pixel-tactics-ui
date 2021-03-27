import { io } from 'socket.io-client';

const socketUrl = 'ws://localhost:3001';

export const socket = io(socketUrl, {
  transports: ['websocket'],
  autoConnect: false,
});
