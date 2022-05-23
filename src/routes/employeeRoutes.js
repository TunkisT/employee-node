const express = require('express');
const { getEmployee, writeEmployee } = require('../controllers/employesController');
const { validateEmployee } = require('../utils/helpers');

const employeeRoutes = express.Router();

employeeRoutes.get('/', getEmployee);
employeeRoutes.post('/add', validateEmployee, writeEmployee);

module.exports = employeeRoutes;
