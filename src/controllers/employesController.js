const { getEmployeeFromDb } = require('../models/employeeModel');
const { failResponse, successResponse } = require('../utils/dbHelpers');

async function getEmployee(req, res) {
  const { user_id } = req.body;

  const employee = await getEmployeeFromDb(user_id);
  if (!employee) {
    failResponse(res);
    return;
  }
  successResponse(res, employee);
}

module.exports = {
  getEmployee,
};
