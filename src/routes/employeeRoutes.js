const express = require('express');
const { getEmployee, writeEmployee } = require('../controllers/employesController');

const employeeRoutes = express.Router();

employeeRoutes.get('/', getEmployee);
employeeRoutes.post('/add', writeEmployee);

module.exports = employeeRoutes;
