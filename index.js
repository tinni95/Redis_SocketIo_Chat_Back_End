const express = require("express"),
  bodyParser = require("body-parser"),
  redis = require("./redisClient"),
  config = require("./constants/config"),
  authRoutes = require("./routes/auth"),
  clientsRoutes = require("./routes/clients"),
  chatRoutes = require("./routes/chat"),
  mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://tinni:Chisana95@cluster0-fqkl1.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    redis.ConnectToRedis(startApp); //initiate redis, calling startApp if connection succeeds
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
  //set up header for REST API
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//we define the routes
app.use("/auth", authRoutes);
app.use("/clients", clientsRoutes);
app.use("/chat", chatRoutes);

function startApp(isSuccess) {
  if (isSuccess) {
    const server = app.listen(config.web_port, function () {
      console.log(
        "Server started " +
          config.web_port +
          " at " +
          new Date().toLocaleString().substr(0, 24)
      );
    });
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      socket.on("join room", (userId) => {
        socket.join(userId);
      });

      socket.on("leave room", (userId) => {
        socket.leave(userId);
      });
    });
  } else {
    console.log("Server failed to start.");
  }
}
