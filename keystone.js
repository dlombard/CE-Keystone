// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();
var logger = require('./logger');
// Require keystone
var keystone = require('keystone');
var Email = require('keystone-email')
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
var nconf = require('nconf');
var app = express();


nconf.file({ file: './config.json' });
logger.log('info', 'STARTING APP')

keystone.mongoose = Promise.promisifyAll(mongoose);
app.get('/js/bundle.js', (req, res) => {
	res.setHeader('Content-Type', 'application/javascript');
	res.sendFile('bundle.js', { root: `${__dirname}/` });
});
//app.use(express.static('public'));
app.use(express.static('images'));
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use('/styles/', express.static(path.resolve(__dirname, '..', 'css')));
app.use(require('morgan')("combined", { "stream": logger.stream }));
keystone.init({
	'name': 'Cesperance-Backend',
	'brand': 'Cesperance-Backend',
	'compress': true,
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',
	'auto update': true,
	'session': true,
	'session store': 'mongo',
	'mongo': process.env.MONGO_URI || 'mongodb://localhost:27017',
	'auth': true,
	'user model': 'User',
	'wysiwyg additional buttons': 'preview',
	'wysiwyg additional plugins': 'preview',
	'port': nconf.get('port'),
	'host': nconf.get('host'),
	'mongoose': Promise.promisifyAll(mongoose),
	'mongo options': nconf.get('mongoose').options,
	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,
});

//keystone.app = app
keystone.import('./lib/server/models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

//keystone.set('email nodemailer', transport)
keystone.set('routes', require('./lib/server/routes/react'));

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
	songs: 'songs'
});



keystone.start();
