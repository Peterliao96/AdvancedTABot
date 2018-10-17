const bcrypt = require('bcrypt');
const Boom = require('boom');
const JWT = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/config');
const sanitizeUser = require('../helpers/sanitizeUser');

const secret = config.jwt.secret;
const expiresIn = config.jwt.expiresIn;

const getHashedPassword = (password) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

async function createUser(request, h) {
  let newUser;
  await User.findOne({ email: request.payload.email }).then(
    (user) => {
      console.log(user)
      if (!user) {
        const hashedPassword = getHashedPassword(request.payload.password);
        newUser = new User({
          fullName: request.payload.fullName,
          email: request.payload.email,
          password: hashedPassword,
        });
        console.log(newUser)
        newUser.save((err) => { console.log(err); });
        const token = JWT.sign({ email: newUser.email }, secret, { expiresIn });
        reply.response({ token, user: sanitizeUser(newUser) });
      }
      const response = h.response('User already exists');
    response.type('text/plain');
    response.header('X-Custom', 'some-value');
    return response;
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = createUser;
