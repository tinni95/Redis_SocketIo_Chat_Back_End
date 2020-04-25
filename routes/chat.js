const express = require('express');
const isAuthOperatorOrChatOwner = require("../middleware/isAuthOperatorOrChatOwner")
const chatController = require('../controllers/chat');

const router = express.Router();

// GET /chat
router.get('/:clientId', isAuthOperatorOrChatOwner, chatController.getChat);

// Post /chat
router.post('/:clientId', isAuthOperatorOrChatOwner, chatController.postMessage);

module.exports = router;
