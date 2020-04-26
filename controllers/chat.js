const redis = require("../redisClient")
const io = require("../socket")

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
    const timestamp = Date.now();
    console.log("socket", {isAdmin,message,roomId,timestamp})
    io.getIO().emit("new message",{
      isAdmin,
      message,
      roomId,
      timestamp
    });
    redis.pushMessage({ timestamp,roomId,isAdmin, message})
    .then(len=>{
      if (!len) {
        const error = new Error('Could not post message.');
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json({ message: 'message sent.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  };
  