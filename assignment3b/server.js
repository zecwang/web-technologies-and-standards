console.log("In server.js!");
require('dotenv').config();

// init project
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB = ("mongodb+srv://" +
	"zew20" +
	":"
	+ process.env.PASSWORD +
	"@"
	+ process.env.HOST +
	"/"
	+ process.env.DATABASE);
// console.log("Connection String: "+mongoDB);

mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true, useUnifiedTopology: true});

//debugging
mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + process.env.DATABASE);
});

mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected.');
});

//start express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//use the static files in the public folder
app.use(express.static('public'));

// set the view engine
app.set("view engine", "ejs")
app.set("views", __dirname + "/views/");

// Load routes
const apiRouter = require("./routes/api");
const indexRouter = require("./routes/index");

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use(function (error, request, response, next) {
	if (!error.statusCode) error.statusCode = 500;
	response.status(error.statusCode).send(error.message);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
