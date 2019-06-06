const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bid = new Schema({
	post_id: {
		type: String
	},
	author: Schema.Types.Mixed,
	hours: {
		type: Number,
	},
	hourrate: {
		type: Number,
	}
}, {
	collection: 'bids'
});

module.exports = mongoose.model('Bid', Bid);