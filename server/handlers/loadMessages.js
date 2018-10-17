const Boom = require('boom');
const Conversation = require('../models/conversation');

async function loadMessages(request, reply) {
  await Conversation.findById(request.params.conversationId).populate('messages').then(
    (conversation) => {
      if (conversation) {
        reply({ id: conversation._id, messages: conversation.messages });
      } else {
        reply(Boom.notFound('Cannot find conversations'));
      }
    },
  );
}

module.exports = loadMessages;
