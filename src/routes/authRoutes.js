const express = require('express');
const { authController, loginController } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../utils/helpers');

const authRoutes = express.Router();

authRoutes.post('/register', validateRegistration, authController);
authRoutes.post('/login', validateLogin, loginController);

module.exports = authRoutes;
