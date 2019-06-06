const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
	category: {
		type: String
	},
	description: {
		type: String,
	},
	closetime: {
		type: Number,
	},
	posttime: {
		type: Number,
	},
	hourpay: {
		type: Number,	
	},
	bidcount: {
		type: Number,
		default: 0,
	},
	username: {
		type: String,
	}
}, {
	collection: 'posts'
});

module.exports = mongoose.model('Post', Post);