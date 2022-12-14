import type { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';


export const CreateSockets = (httpServer: HTTPServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  const connections = io.of('/remote-ctrl');

  connections.on('connection', socket => {
    console.log('connection established');

    socket.on('offer', sdp => {
      // Send to electron app
      socket.broadcast.emit('offer', sdp);
    });

    socket.on('answer', sdp => {
      // Send to electron app
      socket.broadcast.emit('answer', sdp);
    });

    socket.on('icecandidate', icecandidate => {
      socket.broadcast.emit('icecandidate', icecandidate);
    });
  });
};
