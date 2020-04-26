const Client = require('../models/client');

exports.getClients = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  let totalItems;
  Client.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Client.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(clients => {
      res
        .status(200)
        .json({
          message: 'Fetched clients successfully.',
          clients: clients,
          totalItems: totalItems
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getClient = (req, res, next) => {
  const clientId = req.params.clientId;
  Client.findById(clientId)
    .then(client => {
      if (!client) {
        const error = new Error('Could not find client.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Client fetched.', client: client });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

