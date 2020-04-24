const redis= require('redis'),
config = require('./constants/config.js');
var redisClient;
var Q = require('q');

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

exports.createUser = async function(data) {
	return redisClient.hmset(data.email, {
		'name': data.name,
		'password': data.password,
	});
}

exports.getDetails = function(email) {
	var deffered = Q.defer();
	redisClient.hget(email, "name", function(err, result) {
		if (!err) {
			deffered.resolve(result)
		} else {
			deffered.reject(err);
		}
	});
	return deffered.promise;
}

exports.getUserDetails= function(email) {
	var deffered = Q.defer();
	redisClient.hmget(email, ["name","password"], function(err, result) {
		if (!err) {
			deffered.resolve(result)
		} else {
			deffered.reject(err);
		}
	});
	return deffered.promise;
}

exports.getClients = function(startPos, endPos) {
	var deffered = Q.defer();
	redisClient.lrange(roomID, startPos, endPos, function(err, res) {
		if (!err) {
			var result = [];
			// Loop through the list, parsing each item into an object
			for (var msg in res)
				result.push(JSON.parse(res[msg]));
			result.push(roomID);
			deffered.resolve(result)
		} else {
			deffered.reject(err);
		}
	});
	return deffered.promise;
}
