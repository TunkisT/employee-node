const { addUserToDb, getUserFromDb } = require('../models/authModel');
const { failResponse, successResponse } = require('../utils/dbHelpers');
const { hashPass, verifyHash, generateJwtToken } = require('../utils/helpers');

async function authController(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = hashPass(password);
  const insertUser = await addUserToDb(username, email, hashedPassword);
  if (!insertUser) {
    failResponse(res);
    return;
  }
  successResponse(res, 'New user created');
}

async function loginController(req, res) {
  const { email, password } = req.body;
  const findResults = await getUserFromDb(email);

  if (!findResults) return failResponse(res, 'something went wrong');
  if (!findResults.length) return failResponse(res, 'email or pass not match');

  const foundUserObj = findResults[0];
  if (!verifyHash(password, foundUserObj)) {
    const error = [{ message: 'incorrect email or password' }];
    return failResponse(res, error);
  }
  const token = generateJwtToken(foundUserObj);
  return successResponse(res, token);
}

module.exports = {
  authController,
  loginController,
};
