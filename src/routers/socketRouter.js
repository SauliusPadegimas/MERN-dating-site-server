module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', (newMessage) => {
      let room = [newMessage.sendingUser, newMessage.receivingUSer];
      room = room.sort().join('&');
      messages.push({ ...newMessage, room });
      const usersMessages = messages.filter((x) => x.room === room);
      io.in(room).emit('message', { usersMessages, room });
    });

    socket.on('join', ({ sender, receiver }) => {
      let room = [sender, receiver];
      room = room.sort().join('&');
      socket.join(room);
      console.log(`${sender} have joined room: ${room}`);
      const usersMessages = messages.filter((x) => x.room === room);
      io.in(room).emit('message', { usersMessages, room });
    });
  });
};
