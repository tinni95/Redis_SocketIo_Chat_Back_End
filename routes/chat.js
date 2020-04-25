const express = require('express');

const chatController = require('../controllers/chat');

const router = express.Router();

// GET /chat
router.get('/:clientId', isAuth, chatController.getChat);

// Post /chat
module.exports = router;
