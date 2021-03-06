const JWT = require('jsonwebtoken');
const Boom = require('boom');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('../config/config');
const sanitizeUser = require('../helpers/sanitizeUser');

const secret = config.jwt.secret;
const expiresIn = config.jwt.expiresIn;

function login({
  headers,
  payload: { email, password },
}, reply) {
  User.findOne({ email }).then(
    (user) => {
      if (!user) {
        return reply(Boom.notFound('Wrong email or password'));
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return reply(Boom.unauthorized('Wrong email or password'));
      }

      const token = JWT.sign({ email: user.email }, secret, { expiresIn });
      return reply({ token, user: sanitizeUser(user) });
    });
}

module.exports = login;
