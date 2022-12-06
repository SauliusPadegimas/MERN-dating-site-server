const express = require('express');
const { savePost, getPost } = require('../controllers/messageControler');
// eslint-disable-next-line prettier/prettier
const { saveUser, getUsers, loginUser, getUser } = require('../controllers/userControler');
const { regValidator, userValidator } = require('../middleware/validator');

const mainRouter = express.Router();
mainRouter.post('/users/login', loginUser);
mainRouter.post('/users', regValidator, saveUser);
mainRouter.get('/users/:secret', getUser);
mainRouter.get('/users', getUsers);
mainRouter.post('/posts', userValidator, savePost);
mainRouter.get('/posts', getPost);
module.exports = mainRouter;
