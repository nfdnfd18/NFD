import { io } from 'socket.io-client';

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:2024';
const socket = io(SOCKET_URL);

socket.on('connect', () => {
  console.log('Client connected, id=', socket.id);
  socket.emit('newUser', { userId: 'test-client-esm' });
});

socket.on('connect_error', (err) => {
  console.error('connect_error', err.message);
});

socket.on('disconnect', (reason) => {
  console.log('disconnected', reason);
  process.exit(0);
});

setTimeout(() => {
  console.log('Exiting after 5s');
  socket.close();
  process.exit(0);
}, 5000);
