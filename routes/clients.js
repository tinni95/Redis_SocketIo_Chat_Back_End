const express = require('express');
const { body } = require('express-validator/check');
const isAdminAuth = require("../middleware/isAuthOperator");
const clientsController = require('../controllers/clients');

const router = express.Router();

// GET /clients
// we use is adminAuth middleware, as only admin user can view clients
router.get('/', isAdminAuth, clientsController.getClients);
router.get('/:clientId',isAdminAuth, clientsController.getClient);

module.exports = router;
