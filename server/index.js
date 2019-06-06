'use strict';

let express = require('express'),
	bodyParser = require('body-parser'),
	moment = require('moment');

let	app = express();

let mongoose = require('mongoose'),
	config = require('./config/db');

mongoose.Promise = global.Promise;
mongoose
	.connect(config.DB, { useNewUrlParser: true })
	.then(
		() => {console.log('Database is connected') },
		err => { console.log('Can not connect to the database' + err)}
	);

let Post = require('./models/post');
let Bid = require('./models/bid');

//------------------------------------------------------------------------------
// Server API
//------------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// enable CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Max-Age', 7200);
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/posts/get/:id', function(req, res, next) {
	let postId = req.params.id;
	Post.findOne({_id: postId}, function(err, post) {
		if (err) {
			console.log(err);
		} else {
			Bid.find({post_id: postId}, function(err, bids) {
				if (err) {
					res.json(err);
				} else {
					res.status(200).json({post, bids});
				}
			});
		}
	});
});

app.get('/posts', function(req, res, next) {
	Post.find(function(err, posts) {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(posts);
		}
	});
});


app.post('/posts/create', function(req, res, next) {
	let post = req.body;
	post.posttime = moment().valueOf();
	// create a new post
	post = new Post(post);
	post.save()
		.then(post => {
			res.status(200).json(post);
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});


app.get('/posts/delete/:id', function(req, res, next) {
	let postId = req.params.id;
	Post.findOneAndDelete({_id: postId}, function(err, post) {
		if (err) {
			res.json(err);
		} else {
			res.json(postId);
		}
	});
});


app.post('/posts/edit', function(req, res, next) {
	let postToEdit = req.body;
	// edit a post
	Post.findOneAndUpdate({_id: postToEdit._id}, {$set: postToEdit}, {upsert: true}, function(err, post) {
		if (err) {
			res.json(err);
		} else {
			res.json(post);
		}
	});
});


app.post('/bids/add', function(req, res, next) {
	let bid = req.body;
	// edit a post by increasing the bid count
	Post.findOneAndUpdate({_id: bid.post_id}, {$inc: { bidcount: 1 }}, function(err, post) {
		if (err) {
			res.json(err);
		}
	});

	// create a new bid
	bid = new Bid(bid);
	bid.save()
		.then(bid => {
			res.status(200).json(bid);
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

app.use(express.static(__dirname +'./../dist/')); // serves the index.html
app.listen(3000); // listens on port 3000 -> http://localhost:3000/
console.log('Started server listening on port 3000');
