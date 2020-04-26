const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config= require("../constants/config");

const Client = require('../models/client');
const Operator = require('../models/operator');

exports.loginClient = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  Client.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        config.jwt_secret,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.loginOperator = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  Operator.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('An operator with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          isOperator:true,
          userId: loadedUser._id.toString()
        },
        config.jwt_secret,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
