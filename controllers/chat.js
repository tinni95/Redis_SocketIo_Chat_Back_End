const redis = require("../redisClient")

exports.getChat = (req, res, next) => {
  const clientId = req.params.clientId;
  redis.getMessages(clientId, 0)
    .then(chat => {
      if (!chat) {
        const error = new Error('Could not find chat.');
        error.statusCode = 404;
        throw error;
      }
      console.log(chat)
      res.status(200).json({ message: 'chat fetched.', chat: chat });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postMessage = (req, res, next) => {
    const isAdmin = req.isOperator;
    const message = req.body.message;
    const roomId = req.params.clientId;
    console.log(message)
    redis.pushMessage({ roomId,isAdmin, message})
  };
  