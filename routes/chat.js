const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /clients
router.get('/clients', feedController.getClients);

router.get('/client/:postId', feedController.getPost);

module.exports = router;
