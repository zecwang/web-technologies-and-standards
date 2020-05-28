// Data Model for Dictionary
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DictionarySchema = new Schema(
	{
		word: {type: String},
		def: {type: String}
	},
	{collection: 'dictionary'}
);

// Export model
module.exports = mongoose.model("dictionary", DictionarySchema);