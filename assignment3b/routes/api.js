// Route handlers
const express = require('express');
const router = express.Router();

//import data models
const Dictionary = require('../models/dictionary');
const News = require('../models/news');

// ********************
// **** Dictionary ****
// ********************
// GET
router.get("/dictionary", function (req, res) {
	Dictionary.find({}, function (err, dictionary_list) {
		res.json(dictionary_list);
	})
});

router.get("/dictionary/:word", function (req, res) {
	Dictionary.find({word: req.params.word}, function (err, word) {
		if (word.length > 0)
			res.json(word);
		else
			res.status(404).send([])
	})
});

// POST
router.post("/dictionary", function (req, res) {
	if (req.body.word && req.body.def) {
		let word = new Dictionary(req.body);
		word.save();
		res.status(201).send(word);
	} else res.status(400).send([])
});

// PUT
router.put("/dictionary", function (req, res) {
	Dictionary.find({word: req.body.word}, function (err, word) {
		if (req.body.word && req.body.def) {
			word.forEach(function (el) {
				el.word = req.body.word;
				el.def = req.body.def;
				el.save();
			});
			if (word.length > 0)
				res.json(word);
			else
				res.status(404).send([])
		} else res.status(400).send([])
	})
});

// Delete One
router.delete("/dictionary/:word", function (req, res) {
	Dictionary.deleteOne({word: req.params.word}, function (err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(204).send('removed');
		}
	});
});

// Delete Many
router.delete("/dictionary/:word/all", function (req, res) {
	Dictionary.deleteMany({word: req.params.word}, function (err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(204).send('removed');
		}
	})
});

// ***********************
// **** News Articles ****
// ***********************
// GET
router.get("/news", function (req, res) {
	News.find({}, function (err, news_list) {
		res.json(news_list)
	})
});

router.get("/news/article/:docID", function (req, res) {
	News.find({docID: req.params.docID}, function (err, article) {
		res.json(article)
	})
});

router.get("/news/author/:author/articles", function (req, res) {
	News.find({author: {'$regex': req.params.author, '$options': 'i'}}, function (err, articles) {
		res.json(articles)
	})
});

// query parameters
router.get("/news/article", function (req, res) {
	const author = req.query.author;
	const docID = req.query.docID;
	if (author && docID) {
		News.find({author: {'$regex': author, '$options': 'i'}, docID: docID}, function (err, articles) {
			res.json(articles)
		})
	} else if (author) {
		News.find({author: {'$regex': author, '$options': 'i'}}, function (err, articles) {
			res.json(articles)
		})
	} else if (docID) {
		News.find({docID: docID}, function (err, articles) {
			res.json(articles)
		})
	} else res.status(400).send("Query parameters [ author | docID ] required, cannot be empty");
});

// Update Many
router.put("/news/update/author/:before/:after", function (req, res) {
	News.find({author: {'$regex': req.params.before, '$options': 'i'}}, function (err, articles) {
		articles.forEach(function (el) {
			el.author = el.author.replace(req.params.before, req.params.after);
			el.save();
		});
		if (articles.length > 0)
			res.json(articles);
		else
			res.status(404).send([])
	});
});

module.exports = router;