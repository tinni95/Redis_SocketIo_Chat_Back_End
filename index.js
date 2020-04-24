const express = require('express'),
    io = require('socket.io')(),
    bodyParser = require('body-parser'),
    redis= require("./redisClient"),
    config= require("./constants/config"),
    authRoutes = require("./routes/auth"),
    clientsRoutes = require("./routes/clients"),
    mongoose= require('mongoose');
    
const app = express();

mongoose
  .connect(
    'mongodb+srv://tinni:Chisana95@cluster0-fqkl1.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(result => {
    redis.ConnectToRedis(startApp); //initiate redis, calling startApp if connection succeeds
  })
  .catch(err => console.log(err));


app.use(bodyParser.json()); // application/json
app.use((req, res, next) => { //seet up header for REST API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//we define the routes
app.use('/auth', authRoutes);
app.use('/clients', clientsRoutes);

function startApp(isSuccess) {
	if (isSuccess) {
		var server=app.listen(config.web_port, function() {
			console.log('Server started ' + config.web_port + ' at ' +
				(new Date().toLocaleString().substr(0, 24)));
		});
    io.attach(server);
	} else {
		console.log("Server failed to start.");
	}
}

io.on('connection', (socket) => {
  console.log('A socket is now open');
});
