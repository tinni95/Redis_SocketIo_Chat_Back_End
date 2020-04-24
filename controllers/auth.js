const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis= require("../redisClient");
const config= require("../constants/config");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      redis.createUser({
        name,
        email,
        password:hashedPw
      })
    })
    .then(result => {
      res.status(201).json({ message: 'User created!' }); //return response 201 (created)
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUserEmail, loadedUserPassword;
  redis.getUserDetails(email)
    .then(user => {
      if (!user[0]) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUserEmail = user[0];
      loadedUserPassword = user[1];

      return bcrypt.compare(password, loadedUserPassword);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUserEmail
        },
        config.jwt_secret,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
