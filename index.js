const express = require('express'),
    io = require('socket.io')(),
    bodyParser = require('body-parser'),
    redis= require("./redisClient"),
    config= require("./constants/config"),
    authRoutes = require("./routes/auth");
    
const app = express();

redis.ConnectToRedis(startApp); //initiate redis, calling startApp if connection succeeds

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
