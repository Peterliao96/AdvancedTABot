// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.
//const hapiAuthJwt2 = require('hapi-auth-jwt2');
//const handlers = require('./handlers');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const morgan = require('morgan');
const jwt = require('express-jwt');
const User = require('./models/user');
//const laabr = require('laabr');
//const Hapi = require('hapi');
const mongoose = require('mongoose');
//const Joi = require('joi');
const config = require('./config/config');
const createUserRouter = require('./routes/createUser');
const addFriendRouter = require('./routes/addFriend');
const createBotRouter = require('./routes/createBot');
const deleteBotRouter = require('./routes/deleteBot');
const loadBotsRouter =  require('./routes/loadBots');
const friendRequestRouter = require('./routes/friendRequest')
const loadMyProfileRouter = require('./routes/loadMyProfile');
const loginWithFBRouter = require('./routes/loginWithFB');
const uploadAvatarRouter = require('./routes/uploadAvatar');
const createConversationsRouter = require('./routes/createConversations');
const createMessageRouter = require('./routes/createMessage');
const loadConversationsRouter = require('./routes/loadConversations');
//const loadMessagesRouter = require('./routes/loadMessages');*/
const loginRouter = require('./routes/login');
const loadSearchUserRouter = require('./routes/loadSearchUser');
const loadFriendsRouter = require('./routes/loadFriends');
const deleteFriendRouter = require('./routes/deleteFriend');
const editBotRouter = require('./routes/editBot');
app.use(morgan('dev'));
/*app.use(jwt({
  secret: 'asfasfasdf',
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/register', createUserRouter);
app.use('/loadBots',loadBotsRouter);
app.use('/login',loginRouter)
app.use('/loadSearchUser',loadSearchUserRouter);
app.use('/addfriends',addFriendRouter);
app.use('/createBot',createBotRouter);
app.use('/deleteBot',deleteBotRouter);
app.use('/friendRequest',friendRequestRouter)
app.use('/getMyProfile',loadMyProfileRouter)
app.use('/loadFriends',loadFriendsRouter);
app.use('/loginWithFB',loginWithFBRouter);
app.use('/uploadAvatar',uploadAvatarRouter);
app.use('/deleteFriend',deleteFriendRouter);
app.use('/editBot',editBotRouter);
app.use('/createConversation',createConversationsRouter);
app.use('/createMessage',createMessageRouter);
app.use('/loadConversations',loadConversationsRouter);
//app.use('/loadFriends',loadFriendRouter);


var server = http.createServer(app);
PORT = config.server.port;
HOST = config.server.host;
server.listen(PORT, HOST,function(){
  console.log(`Server running at:${HOST}:${PORT} 🚀`)
})

const socketio = require('socket.io')(server.listener,{
  pingTimeOut: 5000
});
const socket = {};

socketio.on('connection', (socket) => {
  socket.on('init', (userId) => {
    sockets[userId.senderId] = socket;
  });
  socket.on('message', (message) => {
    if (sockets[message.receiverId]) {
      sockets[message.receiverId].emit('message', message);
    }
    /* handler for creating message */
  });
  socket.on('disconnect', (userId) => {
    delete sockets[userId.senderId];
  });
})


mongoose.connect(config.database,{useNewUrlParser: true,useCreateIndex: true,})
.then(() => {
  console.log('Connected to the Mongo server ' + config.database)
})
.catch(err => {
  console.log(err)
})
/*const validate = (decoded, request, callback) => {
  User.findOne({ email: decoded.email }).then(
    (user) => {
      if (!user) {
        return callback(null, false);
      }
      return callback(null, true);
    },
  );
};

const init = async () => {
  const server = new Hapi.Server(config.server);
  await server.register([hapiAuthJwt2,laabr]);

  server.auth.strategy('jwt', 'jwt', {
      key: config.jwt.secret,
      validate: validate,
      verifyOptions: {
        algorithms: ['HS256'],
      },
    })

    server.auth.default('jwt');

    server.route({
        method: 'POST',
        path: '/register',
        handler: handlers.createUser,
        config: {
          auth: false,
          validate: {
            payload: {
              fullName: Joi.string().required(),
              email: Joi.string().required(),
              password: Joi.string().required(),
            },
          },
        },
      });

    server.route({
        method: 'POST',
        path: '/login',
        handler: handlers.login,
        config: {
          auth: false,
          validate: {
            payload: {
              email: Joi.string().required(),
              password: Joi.string().required(),
            },
          },
        },
      });

    server.route({
        method: 'POST',
        path: '/friends',
        handler: handlers.addFriend,
        config: {
          auth: 'jwt',
          validate: {
            payload: {
              email: Joi.string().required(),
            },
          },
        },
      });

    server.route({
        method: 'GET',
        path: '/friends',
        handler: handlers.loadFriends,
        config: {
          auth: 'jwt',
        },
      });

    server.route({
        method: 'GET',
        path: '/conversations',
        handler: handlers.loadConversations,
        config: {
          auth: 'jwt',
        },
      });

    server.route({
        method: 'POST',
        path: '/conversations',
        handler: handlers.createConversation,
        config: {
          auth: 'jwt',
          validate: {
            payload: {
              friendId: Joi.string().required(),
            },
          },
        },
      });

    server.route({
        method: 'GET',
        path: '/messages/{conversationId}',
        handler: handlers.loadMessages,
        config: {
          auth: 'jwt',
        },
      });

      await server.start();
      mongoose.connect(config.database,{useNewUrlParser: true,useCreateIndex: true,})
      .then(() => {
        console.log('Connected to the Mongo server ' + config.database)
      })
      .catch(err => {
        console.log(err)
      })
      return server
}

init().then(server => {
  console.log('Server running at: '+server.info.uri+ ' 🚀');

  const socketio = require('socket.io')(server.listener,{
    pingTimeOut: 5000
  });
  const socket = {};

  socketio.on('connection', (socket) => {
    socket.on('init', (userId) => {
      sockets[userId.senderId] = socket;
    });
    socket.on('message', (message) => {
      if (sockets[message.receiverId]) {
        sockets[message.receiverId].emit('message', message);
      }
       handler for creating message
    });
    socket.on('disconnect', (userId) => {
      delete sockets[userId.senderId];
    });
  });
})
.catch(error => {
  console.log(error);
});*/







/*var rn_bridge = require('rn-bridge');
// Echo every message received from react-native.
rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send(msg);
} );

// Inform react-native node is initialized.
rn_bridge.channel.send("Welcome to TABot!");*/
