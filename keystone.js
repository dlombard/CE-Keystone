// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();
const logger = require('./logger');
// Require keystone
const keystone = require('keystone');
const Email = require('keystone-email')
const handlebars = require('express-handlebars');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const requestIp = require('request-ip')
const history = require('connect-history-api-fallback');
const app = express();

app.get('/js/bundle.js', (req, res) => {
	res.setHeader('Content-Type', 'application/javascript');
	res.sendFile('bundle.js', { root: `${__dirname}/` });
});
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use('/styles/', express.static(path.resolve(__dirname, '..', 'css')));
app.use(require('morgan')("combined", { "stream": logger.stream }));
keystone.init({
	'name': 'Cesperance',
	'brand': 'Cesperance',
	'compress': true,
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',
	'auto update': true,
	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',
	'wysiwyg additional buttons': 'preview',
	'wysiwyg additional plugins': 'preview',
	'host': process.env.HOST || '127.0.0.1',
	'port': process.env.PORT,
	'mongo options': { useMongoClient: true, }
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
	users: 'users',
	songs: 'songs'
});



keystone.start();
