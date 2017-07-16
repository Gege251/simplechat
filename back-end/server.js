// Dependencies
const express       = require('express');
const bodyParser    = require('body-parser');
const logger        = require('./logger');
const basicAuth     = require('basic-auth');
const mongoose      = require('mongoose');
const socketio      = require('socket.io');
const cors          = require('cors');
const cookieParser  = require('cookie-parser');

// API functions
const userApi       = require('./api/user');
const groupApi      = require('./api/group');

logger('Vueapp back-end server booting...');

const app           = express();

app.use(cors({credentials: true, origin: 'http://localhost:3333'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// DB connection
mongoose.connect('mongodb://localhost/vueapp', { useMongoClient: true });
const db = mongoose.connection;

db.once('open', function() {
  logger('MongoDB connected');
})
db.on('error', function(err) {
  logger('Database error: ' + err);
});

/**
 *  Routing
**/

// app.get('/user/sessions', userApi.printSessions);
// app.get('/group/sessions', groupApi.printSessions);

// User API
app.post('/user/login', userApi.login);
app.post('/user/signup', userApi.signUp);
app.get('/user/:userId/logout', userApi.logout);
app.get('/user', userApi.getUser);
app.get('/user/:userId/exists', userApi.idExists);
app.get('/user/:userId/groups', userApi.getGroups);

// Group API

app.get('/messages/:group', groupApi.getMessages);
app.put('/messages/:group', groupApi.newMessage);
app.put('/group', groupApi.createGroup);

const server = app.listen('3001');
const io = socketio(server);
require('./socket-start')(io)

// var sessionCard = sessions.createSession();
// sessions.pushData(sessionCard, {key: 'user', data: 'Gergo'});
// sessions.pushData(sessionCard, {key: 'group', data: 'NG'});

// var sessionCard = sessions.createSession();
// setTimeout(function() {sessions.pushData(sessionCard, {key: 'key', data: 'data'})}, 4000);
// getData();
// setTimeout(getData, 7000)
//
// function getData() {
//   console.log(sessions.pullData(sessionCard, 'key'));
// }
