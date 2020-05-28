// Data Model for News Articles
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
	{
		author: {type: String},
		docID: {type: String},
		title: {type: String},
		url: {type: String},
		content: {type: String},
	},
	{collection: 'news'}
);

// Export model
module.exports = mongoose.model("news", NewsSchema);