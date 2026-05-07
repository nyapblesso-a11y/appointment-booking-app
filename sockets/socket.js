const connectedUsers = new Map();

// userId  socketId
export const registerSocket = (userId, socketId) => {
  connectedUsers.set(Number(userId), socketId);
};

// remove disconnected socket
export const removeSocket = (socketId) => {
  for (const [userId, id] of connectedUsers.entries()) {
    if (id === socketId) {
      connectedUsers.delete(userId);
      break;
    }
  }
};

// emit notification
export const sendNotification = (
  io,
  userId,
  message,
  data = {}
) => {
  const socketId = connectedUsers.get(Number(userId));

  if (!socketId) return;

  io.to(socketId).emit('notification', {
    message,
    ...data
  });
};