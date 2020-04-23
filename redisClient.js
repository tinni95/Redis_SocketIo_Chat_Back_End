const redis= require('redis'),
config = require('./config.js');

exports.ConnectToRedis = function(startApp) {
	redisClient = redis.createClient(config.redis_port, config.redis_hostname);

	redisClient.on('ready', function() {
		console.log('Connected to Redis');
		startApp(true);
	});

	redisClient.on('error', function() {
		console.log('Failed to connect to Redis');
		startApp(false);
	});
}

exports.createUser = function(data) {
	redisClient.hmset(data.Email, {
		'Name': data.Name,
		'Surname': data.Surname,
	});
}