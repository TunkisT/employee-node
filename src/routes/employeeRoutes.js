const express = require('express');
const { getEmployee, writeEmployee } = require('../controllers/employesController');
const { validateEmployee, validateToken } = require('../utils/helpers');

const employeeRoutes = express.Router();

employeeRoutes.get('/', validateToken, getEmployee);
employeeRoutes.post('/add', validateEmployee, writeEmployee);

module.exports = employeeRoutes;
