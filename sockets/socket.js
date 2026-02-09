let io;

export const initSockets = (serverIO) => {
  io = serverIO;

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (userId) => {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} joined room user_${userId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};


// login notification

export const emitLogin = (user) => {
    io.to(`user_${user.id}`).emit('login_notification', {
        message: `${user.name} logged in`,
        userId: user.id,
        role: user.role,
        time: new Date()
    })
}

export const emitSlotCreated = (slot) => {
    io.emit('slot_created', {
        message: 'New slot available',
        slot
    })
}

export const emitAppointmentBooked =(appointment) => {
    io.emit('appointment_booked', {
        message: 'New appointment booked',
        appointment
    })
}

export const emitAppointmentCancelled = (appointmentId) => {
    io.emit('appointment_cancelled', {
        message: 'appointment cancelled',
        appointmentId
    })
}