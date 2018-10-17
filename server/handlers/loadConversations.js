const Boom = require('boom');
const User = require('../models/user');

async function loadConversations(request, reply) {
  await User.findOne({ email: request.auth.credentials.email }).populate('conversations').then(
    (user) => {
      if (user) {
        const conversations = user.conversations.map((conversation) => {
          const friendId = `${user._id}` === conversation.userOneId ?
            conversation.userTwoId : conversation.userOneId;
          return {
            id: conversation._id,
            friendId,
          };
        });
        reply(conversations);
      } else {
        reply(Boom.notFound('Cannot find user'));
      }
    },
  );
}

module.exports = loadConversations;
