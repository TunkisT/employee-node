const express = require('express');
const {
  getEmployee,
  writeEmployee,
  deleteEmployee,
} = require('../controllers/employesController');
const { validateEmployee, validateToken } = require('../utils/helpers');

const employeeRoutes = express.Router();

employeeRoutes.get('/', validateToken, getEmployee);
employeeRoutes.post('/add', validateEmployee, validateToken, writeEmployee);
employeeRoutes.delete('/delete/:id', validateToken, deleteEmployee);

module.exports = employeeRoutes;
