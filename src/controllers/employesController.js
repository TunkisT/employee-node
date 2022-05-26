const {
  getEmployeeFromDb,
  putEmployeeToDb,
  removeEmployeeFromDb,
} = require('../models/employeeModel');
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

async function deleteEmployee(req, res) {
  const { id } = req.params;
  const employee = await removeEmployeeFromDb(id);
  if (employee.affectedRows !== 1) {
    failResponse(res, 'User has not deleted');
    return;
  }
  successResponse(res, 'User deleted!');
}

module.exports = {
  getEmployee,
  writeEmployee,
  deleteEmployee,
};
