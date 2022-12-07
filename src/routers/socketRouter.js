/* eslint-disable no-underscore-dangle */
const UserSchema = require('../schemas/userSchema');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('addImage', async (secret, photo) => {
      const user = await UserSchema.findOne({ secret });
      if (!user) {
        return socket.emit('unauthorized');
      }
      user.photos.push(photo);
      await user.save();
      socket.emit('user', { ...user._doc, password: '' });
    });

    socket.on('users', async () => {
      const users = await UserSchema.find();
      socket.emit('users', users);
    });

    socket.on('like', async (likedId, secret) => {
      const sendingUser = await UserSchema.findOne({ secret });
      sendingUser.liked.push(likedId);
      await sendingUser.save();
      const likedUser = await UserSchema.findById(likedId);
      likedUser.likedBy.push(sendingUser._id);
      await likedUser.save();
      const users = await UserSchema.find();
      socket.emit('user', { ...sendingUser._doc, password: '' });
      socket.emit('users', users);
    });

    socket.on('dislike', async (dislikedId, secret) => {
      const sendingUser = await UserSchema.findOne({ secret });
      sendingUser.disliked.push(dislikedId);
      await sendingUser.save();
      socket.emit('user', { ...sendingUser._doc, password: '' });
    });

    socket.on('stay', (data) => {
      console.log('toStay', data);
    });
  });
};
