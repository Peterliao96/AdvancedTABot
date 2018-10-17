const createUser = require('./createUser');
const login = require('./login');
const addFriend = require('./addFriend');
const loadFriends = require('./loadFriends');
const loadConversations = require('./loadConversations');
const createConversation = require('./createConversations');
const createMessage = require('./createMessage');
const loadMessages = require('./loadMessages');
module.exports = {
  createUser,
  login,
  addFriend,
  loadFriends,
  loadConversations,
  createConversation,
  createMessage,
  loadMessages
}
