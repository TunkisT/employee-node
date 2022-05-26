const { addUserToDb, getUserFromDb } = require('../models/authModel');
const { failResponse, successResponse } = require('../utils/dbHelpers');
const { hashPass, verifyHash, generateJwtToken } = require('../utils/helpers');

async function authController(req, res) {
  const { email, password } = req.body;
  const hashedPassword = hashPass(password);
  const insertUser = await addUserToDb(email, hashedPassword);
  if (insertUser.success === false) {
    let message = [];
    if (insertUser.message.split(' ')[0] === 'Duplicate') {
      message = [{ message: 'This email address is already being used' }];
    }
    failResponse(res, message);
    return;
  }
  successResponse(res, 'New user created');
}

async function loginController(req, res) {
  const { email, password } = req.body;
  const findResults = await getUserFromDb(email);

  if (!findResults)
    return failResponse(res, [
      { message: 'Something went wrong. Please try again.' },
    ]);
  if (!findResults.length)
    return failResponse(res, [{ message: 'Incorrect email or password' }]);

  const foundUserObj = findResults[0];
  if (!verifyHash(password, foundUserObj)) {
    const error = [{ message: 'Incorrect email or password' }];
    return failResponse(res, error);
  }
  const token = generateJwtToken(foundUserObj);
  return successResponse(res, token);
}

module.exports = {
  authController,
  loginController,
};
