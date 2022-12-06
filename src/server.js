/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');

const app = express();
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const http = require('http').createServer(app);
const socketIo = require('socket.io');
const socketRouter = require('./routers/socketRouter');

const testDbConnection = require('./utils/helper');
const mainRouter = require('./routers/RESTrouter');

const io = socketIo(http, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

const { PORT } = process.env;
// MiddleWare
app.use(morgan('dev'));
app.use(cors());
// kad gautame request.body galetume matyti JSON atsiųstus duomenis turim įjungti JSON atkodavimą;
app.use(express.json());
// siunčia media filus
// TEST DB CONNECTION
testDbConnection();
// ROUTES

app.get('/', (req, res) => res.json({ msg: 'server online' }));

app.use('/api', mainRouter);
app.use('/images', express.static('images'));

app.use((req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

http.listen(PORT, () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  console.log(`Server is listening to port: ${PORT}`.cyan.bold)
);

socketRouter(io);
