const MessageSchema = require('../schemas/messageSchema');

async function savePost(req, res) {
  const { sendingUser, room, text } = req.body;
  const message = new MessageSchema({
    sendingUser,
    room,
    text,
  });
  try {
    const resp = await message.save();
    console.log('resp ===', resp);
    res.status(201).json({ error: false, message: 'pst saved', data: resp });
  } catch (error) {
    console.log('error ===', error);
    res.send(400).json({
      error: true,
      message: 'error while connecting to DB',
      data: error,
    });
  }
}

async function getPost(req, res) {
  const messages = await MessageSchema.find();
  res.json(messages);
}

module.exports = { savePost, getPost };
