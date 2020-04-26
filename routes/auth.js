const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/loginClient', authController.loginClient);

router.post('/loginOperator', authController.loginOperator);

module.exports = router;
