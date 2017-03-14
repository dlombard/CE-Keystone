// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');
var compression = require('compression');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var mongoose = require('mongoose')
var Promise = require('bluebird')
var requestIp = require('request-ip')
var history = require('connect-history-api-fallback');
var app = express();

keystone.mongoose = Promise.promisifyAll(mongoose);

app.use(express.static('public'));
app.use(express.static('images'));
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(requestIp.mw())

keystone.init({
	'name': 'Cesperance-Backend',
	'brand': 'Cesperance-Backend',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'wysiwyg additional buttons': 'preview',
	'wysiwyg additional plugins': 'preview'
});

//keystone.app = app
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes/react'));

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
	songs: 'songs'
});



keystone.start();
