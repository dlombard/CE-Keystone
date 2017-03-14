var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var graphql = require('../graphql/graphqlHTTP');
var bodyParser = require('body-parser');
var geolocator = require('geolocator')
// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	//views: importRoutes('./views'),
	api: require('./api/songs')
};

exports = module.exports = function (app) {
	app.use('/graphql', bodyParser.json(), graphql());
	// Views
	/*app.use('/', function (req, res) {
		const ip = req.clientIp;
		getGeo(res)
		res.render('index');
	});*/
	app.get('/api/songs/id/:id', routes.api.get)
	app.get('/api/songs/:book', routes.api.list)
	//app.get('/', routes.views.index);
	//app.get('/blog/:category?', routes.views.blog);
	//app.get('/blog/post/:post', routes.views.post);

};
