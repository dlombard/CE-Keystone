// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();
const logger = require('./logger');
// Require keystone
const keystone = require('keystone');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

keystone.init({
	'name': 'Cesperance',
	'brand': 'Cesperance',
	'compress': true,
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'ejs',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'wysiwyg additional buttons': 'preview',
	'wysiwyg additional plugins': 'preview',
	'mongo options': { useMongoClient: true, },
	'logger': 'combined',
	'logger options': { "stream": logger.stream },
	'host': process.env.HOST || '127.0.0.1',
	'port': process.env.PORT,
	'mongo': process.env.MONGO_URI,
	'session store': (session) => {
		return new MongoDBStore(
			{
				uri: process.env.MONGO_URI,
				collection: 'sessions'
			});
	}
});

//keystone.app = app
keystone.import('./lib/server/models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./lib/server/routes/react'));

keystone.set('nav', {
	users: 'users',
	songs: 'songs',
	books: 'books'
});



keystone.start();
