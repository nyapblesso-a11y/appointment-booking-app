let onlineUsers = new Map(); 

export const registerSocket = (io) => {
  io.on('connection', (socket) => {

    socket.on('register', (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} registered`);
    });

    socket.on('disconnect', () => {
      for (let [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
};

export const sendNotification = (io, userId, message) => {
  const socketId = onlineUsers.get(userId);

  if (socketId) {
    io.to(socketId).emit('notification', {
      message,
      time: new Date()
    });
  }
};
