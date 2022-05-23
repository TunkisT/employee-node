const { addUserToDb } = require('../models/authModel');
const { failResponse, successResponse } = require('../utils/dbHelpers');

async function authController(req, res) {
  const data = req.body;
  const insertUser = await addUserToDb(data);
  if (!insertUser) {
    failResponse(res);
    return;
  }
  successResponse(res, 'New user created');
}

module.exports = {
  authController,
};
