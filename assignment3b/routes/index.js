// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Dictionary = require("../models/dictionary");
const News = require("../models/news");

router.get("/", function (req, res) {
	res.render("index", {});
});

router.get("/dictionary", function (req, res) {
	Dictionary.find({}, function (err, dictionary_list) {
		res.render("dictionary", {dictionary: dictionary_list})
	})
});

router.get("/dictionary/:word", function (req, res) {
	Dictionary.find({word: req.params.word}, function (err, dictionary) {
		if (dictionary.length > 0)
			res.render("dictionary", {
				dictionary: dictionary
			});
		else
			res.render("dictionary", {message: "Not Found"})
	})
});

router.get("/news", function (req, res) {
	News.find({}, function (err, news_list) {
		res.render("news", {
			data: news_list
		})
	})
});

router.get("/news/article/:docID", function (req, res) {
	News.find({docID: req.params.docID}, function (err, article) {
		res.render("news", {
			data: article
		})
	})
});

router.get("/news/author/:author/articles", function (req, res) {
	News.find({author: {'$regex': req.params.author, '$options': 'i'}}, function (err, articles) {
		res.render("news", {
			data: articles
		})
	})
});

router.get("/list", function (req, res) {
	const resources = [
		'Get /api/dictionary',
		'Get /api/dictionary/:word',
		'Post /api/dictionary',
		'Put /api/dictionary',
		'Delete /api/dictionary/:word',
		'Delete /api/dictionary/:word/all',
		'Get /api/news',
		'Get /api/news/article/:docID',
		'Get /api/news/author/:author/articles',
		'Get /api/news/article?author=&docID=',
		'Put /api/news/update/author/:before/:after',
	];
	News.find({}, function (err, news_list) {
		Dictionary.find({}, function (err, dictionary_list) {
			res.render("list", {
				resources: resources,
				dictionary: JSON.stringify(dictionary_list, null, 4),
				news: JSON.stringify(news_list, null, 4),
			})
		}).limit(30);
	}).limit(30);
});

module.exports = router;
