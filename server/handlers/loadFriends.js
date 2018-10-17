const Boom = require('boom');
const User = require('../models/user');

async function loadFriends(request, reply) {
  await User.findOne({ email: request.auth.credentials.email }).populate('friends', 'fullName').then(
    (user) => {
      if (user) {
        const mappedFriends = {};
        user.friends.forEach((friend) => {
          mappedFriends[friend._id] = friend;
        });
        reply(mappedFriends);
      } else {
        reply(Boom.notFound('Cannot find user'));
      }
    },
  );
}

module.exports = loadFriends;
