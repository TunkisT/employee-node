const { getEmployeeFromDb, putEmployeeToDb } = require('../models/employeeModel');
const { failResponse, successResponse } = require('../utils/dbHelpers');

async function getEmployee(req, res) {
  const employee = await getEmployeeFromDb(req.userId);
  if (!employee) {
    failResponse(res);
    return;
  }

  successResponse(res, employee);
}

async function writeEmployee(req, res) {
  const data = req.body;
  data.user_id = req.userId;
  const employee = await putEmployeeToDb(data);
  if (!employee) {
    failResponse(res);
    return;
  }
  successResponse(res, employee);
}

module.exports = {
  getEmployee,
  writeEmployee,
};
