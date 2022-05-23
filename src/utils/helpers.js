const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');
const jwtSecret = process.env.JWT_TOKEN_SECRET;

async function validateRegistration(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const responseToSend = {
      success: false,
      error: formatedError,
    };
    res.status(400).json(responseToSend);
  }
}

async function validateLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const responseToSend = {
      success: false,
      error: formatedError,
    };
    res.status(400).json(responseToSend);
  }
}

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
  validateRegistration,
  validateLogin,
};
