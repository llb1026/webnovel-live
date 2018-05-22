const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const server = require("http").createServer(app);

app.use(express.static("data"));


const mongoDB = "mongodb://127.0.0.1:27017/webnovel-live";
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongodb");
});

require("./config/socket")(server);
require("./config/routes")(app);

module.exports = {app, server};
