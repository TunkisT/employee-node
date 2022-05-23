const express = require('express');
const { getEmployee } = require('../controllers/employesController');

const employeeRoutes = express.Router();

employeeRoutes.get('/', getEmployee);

module.exports = employeeRoutes;
