// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

//load my .json file of english dictionary word
const dictionary = require('./dictionary.json');
const news = require('./news.json');

// create application/json parser
app.use(express.json());

// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({extended: true}));

//use the static files in the public folder
app.use(express.static('public'));

//tell express where to get your views and which template engine to use
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");

//define your routes here. don't forget about error handling
app.route('/').get(function (request, response) {
	let dictionarySlice = {};
	let i = 0;
	for (let el in dictionary) {
		if (++i > 10) break;
		dictionarySlice[el] = dictionary[el];
	}
	i = 0;
	let newsSlice = {};
	for (let el in news) {
		if (++i > 1) break;
		newsSlice[el] = news[el];
	}
	
	response.render("index", {
		dictionary: JSON.stringify(dictionarySlice, null, 4),
		news: JSON.stringify(newsSlice, null, 4),
	});
});

app.route('/dictionary').get(function (request, response) {
	response.json(dictionary);
});

app.route('/views/dictionary').get(function (request, response) {
	response.render("dictionary", {
		dictionary: dictionary,
	})
});

app.route('/dictionary/:word').get(function (request, response) {
	if (dictionary[request.params.word]) {
		response.json(dictionary[request.params.word])
	} else response.status(404).send("Not Found");
});

app.route('/views/dictionary/:word').get(function (request, response) {
	if (dictionary[request.params.word]) {
		response.render("dictionary", {
			word: request.params.word,
			def: dictionary[request.params.word]
		});
	} else response.status(404).send("Not Found");
});

app.route('/dictionary').post(function (request, response) {
	if (request.body.word && request.body.def) {
		dictionary[request.body.word] = request.body.def;
		response.send(request.body);
	} else response.status(400).send([])
});

app.route('/dictionary').put(function (request, response) {
	if (request.body.word && request.body.def) {
		dictionary[request.body.word] = request.body.def;
		response.send(request.body);
	} else response.status(400).send([])
});

app.route('/dictionary/:word').delete(function (request, response) {
	let word = request.params.word;
	let message;
	if (dictionary[word]) {
		delete dictionary[word];
		message = "Delete '" + word + "' successfully";
		response.send(message)
	} else {
		message = "'" + word + "' not exists, no need for deleting";
		response.status(404).send(message)
	}
});

app.route('/news/all').get(function (request, response) {
	response.json(news);
});

app.route('/views/news/all').get(function (request, response) {
	response.render("news", {
		data: news
	})
});

app.route('/news/article/:docID').get(function (request, response) {
	// response.json(news.filter((el) => el.docID === request.params.docID));
	let result = news.filter((el) => el.docID === request.params.docID);
	if (result.length > 0) {
		response.json(result)
	} else response.status(404).send("Not Found");
});

app.route('/views/news/article/:docID').get(function (request, response) {
	// response.json(news.filter((el) => el.docID === request.params.docID));
	let result = news.filter((el) => el.docID === request.params.docID);
	if (result.length > 0) {
		response.render("news", {
			data: result,
		});
	} else response.status(404).send("Not Found");
});

app.route('/news/author/:author/articles').get(function (request, response) {
	let result = news.filter((el) => el.author.toLocaleLowerCase().includes(request.params.author.toLocaleLowerCase()));
	if (result.length > 0)
		response.json(result);
	else
		response.status(404).json([])
});

app.route('/views/news/author/:author/articles').get(function (request, response) {
	let result = news.filter((el) => el.author.toLocaleLowerCase().includes(request.params.author.toLocaleLowerCase()));
	if (result.length > 0)
		response.render("news", {
			data: result,
		});
	else
		response.status(404).json([])
});

app.route('/news/article').get(function (request, response) {
	const author = request.query.author;
	const docID = request.query.docID;
	let result;
	if (author && docID)
		result = news.filter((el) => el.author.toLocaleLowerCase().includes(author.toLocaleLowerCase()) && el.docID === docID);
	else if (author)
		result = news.filter((el) => el.author.toLocaleLowerCase().includes(author.toLocaleLowerCase()));
	else if (docID)
		result = news.filter((el) => el.docID === docID);
	else {
		response.status(400).send("Query parameters required, cannot be empty");
		return;
	}
	if (result.length > 0)
		response.json(result);
	else
		response.status(404).json([])
});

app.route('/views/news/article').get(function (request, response) {
	const author = request.query.author;
	const docID = request.query.docID;
	let result;
	if (author && docID)
		result = news.filter((el) => el.author.toLocaleLowerCase().includes(author.toLocaleLowerCase()) && el.docID === docID);
	else if (author)
		result = news.filter((el) => el.author.toLocaleLowerCase().includes(author.toLocaleLowerCase()));
	else if (docID)
		result = news.filter((el) => el.docID === docID);
	else {
		response.status(400).send("Query parameters required, cannot be empty");
		return;
	}
	if (result.length > 0)
		response.render("news", {
			data: result,
		});
	else
		response.status(404).json([])
});

app.route('/list').get(function (request, response) {
	const resources = [
		'Get /dictionary',
		'Get /dictionary/:word',
		'Post /dictionary',
		'Put /dictionary',
		'Delete /dictionary/:word',
		'Get /news/all',
		'Get /news/article/:docID',
		'Get /news/author/:author/articles',
		'Get /news/article?author=&docID=',
	];
	response.render("list", {
		resources: resources,
		dictionary: JSON.stringify(dictionary, null, 4),
		news: JSON.stringify(news, null, 4),
	})
});


app.use(function (error, request, response, next) {
	if (!error.statusCode) error.statusCode = 500;
	response.status(error.statusCode).send(error.message);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
