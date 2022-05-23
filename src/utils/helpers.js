const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_TOKEN_SECRET;

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyHash(enteredPassword, userObj) {
  return bcrypt.compareSync(enteredPassword, userObj.password);
}

function generateJwtToken(userObj) {
  return jwt.sign({ id: userObj.user_id }, jwtSecret, {
    expiresIn: '3h',
  });
}

module.exports = {
  hashPass,
  verifyHash,
  generateJwtToken,
};
