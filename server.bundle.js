/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("keystone");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-relay");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("graphql-relay");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'NavLink',
  render: function render() {
    return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
  }
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(2);

var buildFind = function buildFind(args, query) {
    if (args.id) {
        args._id = args.id;
        delete args.id;
    }
    query.where = args;
    var data = {};

    return query.model.findAsync(query.where).then(function (results) {
        return results;
    }).catch(function (err) {
        console.log(err);
    });
};

var queryBuilder = function queryBuilder(op, model, args, doc) {
    var query = {
        op: op,
        model: model,
        where: {},
        projection: {},
        skip: {},
        limit: {},
        doc: doc
    };

    switch (op) {
        case 'FIND':

            return buildFind(args, query);
            break;
        case 'FIND_ONE':
            model.findById(args).exec(function (err, item) {

                if (err) return err;
                if (!item) return null;

                return item;
            });
            break;
        default:
            break;
    }

    return {};
};

module.exports = queryBuilder;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    buildSchema = _require.buildSchema,
    GraphQLInt = _require.GraphQLInt,
    GraphQLList = _require.GraphQLList,
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLSchema = _require.GraphQLSchema,
    GraphQLString = _require.GraphQLString,
    GraphQLID = _require.GraphQLID,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLNonNull = _require.GraphQLNonNull,
    Graphql = _require.Graphql;

var _require2 = __webpack_require__(6),
    connectionArgs = _require2.connectionArgs,
    connectionDefinitions = _require2.connectionDefinitions,
    connectionFromArray = _require2.connectionFromArray,
    cursorForObjectInConnection = _require2.cursorForObjectInConnection,
    fromGlobalId = _require2.fromGlobalId,
    globalIdField = _require2.globalIdField,
    mutationWithClientMutationId = _require2.mutationWithClientMutationId,
    nodeDefinitions = _require2.nodeDefinitions,
    toGlobalId = _require2.toGlobalId;

var keystone = __webpack_require__(1);
var db = __webpack_require__(11);

var _nodeDefinitions = nodeDefinitions(function (globalId) {
    var _fromGlobalId = fromGlobalId(globalId),
        type = _fromGlobalId.type,
        id = _fromGlobalId.id;

    var args = { id: id };

    console.log('TYPE: ' + type);
    switch (type) {
        case 'Song':
            return db('FIND_ONE', keystone.list('Song').model, args, null);
        default:
            return null;
    }
}, function (obj) {
    console.log('OBJ: ' + obj);
    return {};
}),
    nodeInterface = _nodeDefinitions.nodeInterface,
    nodeField = _nodeDefinitions.nodeField;

module.exports = { nodeInterface: nodeInterface, nodeField: nodeField };

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// React And Redux Setup

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(47);

var _server2 = _interopRequireDefault(_server);

var _reactRouter = __webpack_require__(7);

var _routes = __webpack_require__(31);

var _routes2 = _interopRequireDefault(_routes);

var _package = __webpack_require__(41);

var _package2 = _interopRequireDefault(_package);

var _graphqlHTTP = __webpack_require__(37);

var _graphqlHTTP2 = _interopRequireDefault(_graphqlHTTP);

var _bodyParser = __webpack_require__(8);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _reactRelay = __webpack_require__(5);

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _isomorphicRelayRouter = __webpack_require__(44);

var _isomorphicRelayRouter2 = _interopRequireDefault(_isomorphicRelayRouter);

var _path = __webpack_require__(9);

var _path2 = _interopRequireDefault(_path);

var _songs = __webpack_require__(40);

var _songs2 = _interopRequireDefault(_songs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GRAPHQL_URL = 'http://localhost:3000/graphql';
// api


var networkLayer = new _reactRelay2.default.DefaultNetworkLayer(GRAPHQL_URL);
// Setup Route Bindings
exports = module.exports = function (app) {
    app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlHTTP2.default)());
    // Views
    /*app.use('/', function (req, res) {
    	const ip = req.clientIp;
    	getGeo(res)
    	res.render('index');
    });*/
    app.get('/api/songs/id/:id', _songs2.default.get);
    app.get('/api/songs/:book', _songs2.default.list);

    // Render Initial HTML
    var appHtml = function appHtml(html, initialState) {
        var head = Helmet.rewind();
        return '<!doctype html>\n        <html>\n          <head>\n            <html>\n            <meta charset=utf-8/>\n            <title>My First React Router App</title>\n            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"\ncrossorigin="anonymous">\n            <link href="/styles/site.css" rel="stylesheet">\n          </head>\n              <div id="app"></div>\n            <script src=\'/js/bundle.js\'></script>\n          </body>\n      </html>';
    };

    var renderError = function renderError(err) {
        var softTab = '&#32;&#32;&#32;&#32;';
        var errTrace = process.env.NODE_ENV !== 'production' ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
        return renderFullPage('Server Error' + errTrace, {});
    };

    // match the backend routes with the client routes
    app.use(function (req, res, next) {
        if (req.path.match(/^\/keystone/)) {
            next();
            return;
        }
        (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
            if (err) {
                res.status(500).send(err.message);
            } else if (redirect) {
                res.redirect(redirect.pathname + redirect.search);
            } else if (props) {
                _isomorphicRelayRouter2.default.prepareData(props, networkLayer).then(render).catch(next);
                // hey we made it!
                //const appHtml = renderToString(<RouterContext {...props} />)
                //res.send(renderPage(appHtml))
            } else {
                res.status(404).send('Not Found');
            }
        });
        function render(_ref) {
            var data = _ref.data,
                props = _ref.props;

            var reactOutput = _server2.default.renderToString(_isomorphicRelayRouter2.default.render(props));
            console.log(reactOutput);
            res.render('index.hbs', {
                preloadedData: JSON.stringify(data),
                reactOutput: reactOutput
            });
        }
    });

    function renderPage(appHtml) {
        return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>My First React Router App</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("connect-history-api-fallback");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("request-ip");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = __webpack_require__(45);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Header = __webpack_require__(28);

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = function (_React$Component) {
    _inherits(Base, _React$Component);

    function Base() {
        _classCallCheck(this, Base);

        return _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).apply(this, arguments));
    }

    _createClass(Base, [{
        key: 'render',
        value: function render() {

            return _jsx('div', {
                className: 'wrapper'
            }, void 0, _jsx(_Header2.default, {}), _jsx(_reactAddonsCssTransitionGroup2.default, {
                component: 'section',
                transitionName: 'example',
                transitionEnterTimeout: 500,
                transitionLeaveTimeout: 500
            }, void 0, _jsx('div', {
                className: 'content'
            }, void 0, _react2.default.cloneElement(this.props.children, {
                key: this.props.location.pathname
            }))));
        }
    }]);

    return Base;
}(_react2.default.Component);

exports.default = Base;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _jsx(_reactBootstrap.Navbar, {
                inverse: true,
                collapseOnSelect: true,
                className: 'header'
            }, void 0, _jsx(_reactBootstrap.Navbar.Header, {}, void 0, _jsx(_reactBootstrap.Navbar.Brand, {}, void 0, _jsx('a', {
                href: '#'
            }, void 0, 'React-Bootstrap')), _jsx(_reactBootstrap.Navbar.Toggle, {})), _jsx(_reactBootstrap.Navbar.Collapse, {}, void 0, _jsx(_reactBootstrap.Nav, {}, void 0, _jsx(_reactBootstrap.NavItem, {
                eventKey: 1,
                href: '#'
            }, void 0, 'Link'), _jsx(_reactBootstrap.NavItem, {
                eventKey: 2,
                href: '#'
            }, void 0, 'Link'), _jsx(_reactBootstrap.NavDropdown, {
                eventKey: 3,
                title: 'Dropdown',
                id: 'basic-nav-dropdown'
            }, void 0, _jsx(_reactBootstrap.MenuItem, {
                eventKey: 3.1
            }, void 0, 'Action'), _jsx(_reactBootstrap.MenuItem, {
                eventKey: 3.2
            }, void 0, 'Another action'), _jsx(_reactBootstrap.MenuItem, {
                eventKey: 3.3
            }, void 0, 'Something else here'), _jsx(_reactBootstrap.MenuItem, {
                divider: true
            }), _jsx(_reactBootstrap.MenuItem, {
                eventKey: 3.3
            }, void 0, 'Separated link'))), _jsx(_reactBootstrap.Nav, {
                pullRight: true
            }, void 0, _jsx(_reactBootstrap.NavItem, {
                eventKey: 1,
                href: '#'
            }, void 0, 'Link Right'), _jsx(_reactBootstrap.NavItem, {
                eventKey: 2,
                href: '#'
            }, void 0, 'Link Right'))));
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = function (_React$Component) {
    _inherits(SearchBar, _React$Component);

    function SearchBar() {
        _classCallCheck(this, SearchBar);

        return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
    }

    _createClass(SearchBar, [{
        key: 'render',
        value: function render() {
            return _jsx('div', {}, void 0, _jsx(_reactBootstrap.Form, {
                className: 'search-bar'
            }, void 0, _jsx(_reactBootstrap.FormGroup, {}, void 0, _jsx(_reactBootstrap.FormControl, {
                type: 'text',
                placeholder: 'Search'
            }))));
        }
    }]);

    return SearchBar;
}(_react2.default.Component);

exports.default = SearchBar;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = undefined;

var _reactRelay = __webpack_require__(5);

var _reactRelay2 = _interopRequireDefault(_reactRelay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queries = exports.queries = { viewer: function viewer() {
    return function () {
      return {
        fieldName: 'viewer',
        kind: 'Query',
        metadata: {},
        name: 'Songs',
        type: 'Viewer'
      };
    }();
  } };

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
/* Relay */


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(46);

var _reactRouter = __webpack_require__(7);

var _App = __webpack_require__(33);

var _App2 = _interopRequireDefault(_App);

var _Home = __webpack_require__(34);

var _Home2 = _interopRequireDefault(_Home);

var _SongsList = __webpack_require__(36);

var _SongsList2 = _interopRequireDefault(_SongsList);

var _Song = __webpack_require__(35);

var _Song2 = _interopRequireDefault(_Song);

var _About = __webpack_require__(32);

var _About2 = _interopRequireDefault(_About);

var _Base = __webpack_require__(27);

var _Base2 = _interopRequireDefault(_Base);

var _Songs = __webpack_require__(30);

var _reactRelay = __webpack_require__(5);

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _reactRouterRelay = __webpack_require__(48);

var _reactRouterRelay2 = _interopRequireDefault(_reactRouterRelay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactRelay2.default.injectNetworkLayer(new _reactRelay2.default.DefaultNetworkLayer('http://localhost:3000/graphql'));

module.exports = _jsx(_reactRouter.Router, {
    history: _reactRouter.browserHistory,
    environment: _reactRelay2.default.Store,
    render: (0, _reactRouter.applyRouterMiddleware)(_reactRouterRelay2.default)
}, void 0, _jsx(_reactRouter.Route, {
    path: '/',
    component: _Base2.default
}, void 0, _jsx(_reactRouter.IndexRoute, {
    component: _Home2.default
}), _jsx(_reactRouter.Route, {
    path: '/about',
    component: _About2.default
}), _jsx(_reactRouter.Route, {
    path: '/:book',
    component: _SongsList2.default,
    queries: _Songs.queries
}, void 0, _jsx(_reactRouter.Route, {
    path: '/songs/:book/:id',
    component: _Song2.default
}))));

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _jsx('div', {}, void 0, 'ABOUT!');
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NavLink = __webpack_require__(10);

var _NavLink2 = _interopRequireDefault(_NavLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'App',
    render: function render() {
        return _jsx('div', {}, void 0, _jsx('h1', {}, void 0, 'React Router Tutorial'), _jsx('ul', {
            role: 'nav'
        }, void 0, _jsx('li', {}, void 0, _jsx(_NavLink2.default, {
            to: '/',
            onlyActiveOnIndex: true
        }, void 0, 'Home')), _jsx('li', {}, void 0, _jsx(_NavLink2.default, {
            to: '/about'
        }, void 0, 'About')), _jsx('li', {}, void 0, _jsx(_NavLink2.default, {
            to: '/songs/be'
        }, void 0, 'Songs'))), this.props.children);
    }
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(4);

var _SearchBar = __webpack_require__(29);

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _NavLink = __webpack_require__(10);

var _NavLink2 = _interopRequireDefault(_NavLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
    _inherits(Home, _React$Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            return _jsx(_reactBootstrap.Grid, {}, void 0, _jsx('h2', {}, void 0, _jsx('span', {}, void 0, ' Le Chant d\'Esp\xE9rance')), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_SearchBar2.default, {})), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                md: 10,
                mdOffset: 1
            }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/ce'
            }, void 0, _jsx('img', {
                src: '/images/ce.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance'))), _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/mj'
            }, void 0, _jsx('img', {
                src: '/images/mj.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance')))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/ee'
            }, void 0, _jsx('img', {
                src: '/images/ee.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance'))), _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/vr'
            }, void 0, _jsx('img', {
                src: '/images/vr.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance')))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/hc'
            }, void 0, _jsx('img', {
                src: '/images/hc.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance'))), _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/rn'
            }, void 0, _jsx('img', {
                src: '/images/rn.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance')))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/ga'
            }, void 0, _jsx('img', {
                src: '/images/ga.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance')))))));
        }
    }]);

    return Home;
}(_react2.default.Component);

exports.default = Home;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _jsx(_reactBootstrap.Grid, {}, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                md: 12
            }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx('a', {
                href: '#'
            }, void 0, _jsx('img', {
                src: '/images/ce'
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance'))), _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx('a', {
                href: '#'
            }, void 0, _jsx('img', {
                src: '/images/mj'
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance')))))));
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRelay = __webpack_require__(5);

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SongsList = function (_React$Component) {
    _inherits(SongsList, _React$Component);

    function SongsList() {
        _classCallCheck(this, SongsList);

        return _possibleConstructorReturn(this, (SongsList.__proto__ || Object.getPrototypeOf(SongsList)).apply(this, arguments));
    }

    _createClass(SongsList, [{
        key: 'render',
        value: function render() {
            var viewer = this.props.viewer;


            return _jsx('div', {}, void 0, viewer.songs.map(function (song) {
                return _jsx('div', {}, song.id, _jsx('span', {}, void 0, song.num + ' ' + song.title), _jsx('br', {}), _jsx('span', {
                    dangerouslySetInnerHTML: { __html: song.lyrics_Markdown.html }
                }), _jsx('br', {}), _jsx('br', {}));
            }));
        }
    }]);

    return SongsList;
}(_react2.default.Component);

exports.default = _reactRelay2.default.createContainer(SongsList, {
    initialVariables: { book: "MJ" },
    prepareVariables: function prepareVariables(prevVariables) {
        return { book: _lodash2.default.upperCase(prevVariables.book) };
    },
    fragments: {

        viewer: function viewer() {
            return function () {
                return {
                    children: [{
                        calls: [{
                            kind: 'Call',
                            metadata: {},
                            name: 'book',
                            value: {
                                kind: 'CallVariable',
                                callVariableName: 'book'
                            }
                        }],
                        children: [{
                            fieldName: 'id',
                            kind: 'Field',
                            metadata: {
                                isRequisite: true
                            },
                            type: 'ID'
                        }, {
                            fieldName: 'title',
                            kind: 'Field',
                            metadata: {},
                            type: 'String'
                        }, {
                            fieldName: 'num',
                            kind: 'Field',
                            metadata: {},
                            type: 'Int'
                        }, {
                            children: [{
                                fieldName: 'md',
                                kind: 'Field',
                                metadata: {},
                                type: 'String'
                            }, {
                                fieldName: 'html',
                                kind: 'Field',
                                metadata: {},
                                type: 'String'
                            }],
                            fieldName: 'lyrics_Markdown',
                            kind: 'Field',
                            metadata: {
                                canHaveSubselections: true
                            },
                            type: 'Markdown'
                        }],
                        fieldName: 'songs',
                        kind: 'Field',
                        metadata: {
                            canHaveSubselections: true,
                            inferredRootCallName: 'node',
                            inferredPrimaryKey: 'id',
                            isPlural: true
                        },
                        type: 'Song'
                    }],
                    id: _reactRelay2.default.QL.__id(),
                    kind: 'Fragment',
                    metadata: {},
                    name: 'SongsList_ViewerRelayQL',
                    type: 'Viewer'
                };
            }();
        }
    }
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var graphqlHTTP = __webpack_require__(43);
var QueryType = __webpack_require__(38);

var _require = __webpack_require__(3),
    GraphQLSchema = _require.GraphQLSchema;

module.exports = function initGraphQL() {
    var schema = new GraphQLSchema({
        query: QueryType
    });

    return graphqlHTTP({
        schema: schema,
        graphiql: true
    });
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    buildSchema = _require.buildSchema,
    GraphQLInt = _require.GraphQLInt,
    GraphQLList = _require.GraphQLList,
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLSchema = _require.GraphQLSchema,
    GraphQLString = _require.GraphQLString,
    GraphQLID = _require.GraphQLID,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLInputObjectType = _require.GraphQLInputObjectType,
    Graphql = _require.Graphql;

var _require2 = __webpack_require__(6),
    connectionArgs = _require2.connectionArgs,
    connectionDefinitions = _require2.connectionDefinitions,
    connectionFromArray = _require2.connectionFromArray,
    cursorForObjectInConnection = _require2.cursorForObjectInConnection,
    fromGlobalId = _require2.fromGlobalId,
    globalIdField = _require2.globalIdField,
    mutationWithClientMutationId = _require2.mutationWithClientMutationId,
    nodeDefinitions = _require2.nodeDefinitions,
    toGlobalId = _require2.toGlobalId;

var keystone = __webpack_require__(1);
var SongType = __webpack_require__(39);

var _require3 = __webpack_require__(12),
    nodeInterface = _require3.nodeInterface,
    nodeField = _require3.nodeField;

var db = __webpack_require__(11);

var Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: function fields() {
        return {
            songs: {
                type: new GraphQLList(SongType),
                args: {
                    book: { type: GraphQLString }
                },
                resolve: function resolve(root, args) {
                    return db('FIND', keystone.list('Song').model, { 'book.abbrv': args.book }, null).then(function (collection) {
                        return collection;
                    });
                }
            }

        };
    }
});

var QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: function fields() {
        return {
            node: nodeField,
            viewer: {
                type: Viewer,
                resolve: function resolve(root, args) {
                    return {};
                }
            }
        };
    }
});

module.exports = QueryType;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    buildSchema = _require.buildSchema,
    GraphQLInt = _require.GraphQLInt,
    GraphQLList = _require.GraphQLList,
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLSchema = _require.GraphQLSchema,
    GraphQLString = _require.GraphQLString,
    GraphQLID = _require.GraphQLID,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLInputObjectType = _require.GraphQLInputObjectType,
    Graphql = _require.Graphql;

var _require2 = __webpack_require__(6),
    connectionArgs = _require2.connectionArgs,
    connectionDefinitions = _require2.connectionDefinitions,
    connectionFromArray = _require2.connectionFromArray,
    cursorForObjectInConnection = _require2.cursorForObjectInConnection,
    fromGlobalId = _require2.fromGlobalId,
    globalIdField = _require2.globalIdField,
    mutationWithClientMutationId = _require2.mutationWithClientMutationId,
    nodeDefinitions = _require2.nodeDefinitions,
    toGlobalId = _require2.toGlobalId;

var _require3 = __webpack_require__(12),
    nodeInterface = _require3.nodeInterface,
    nodeField = _require3.nodeField;

var SongType = new GraphQLObjectType({
    name: 'Song',
    fields: function fields() {
        return {
            id: globalIdField('Song'),
            title: { type: GraphQLString },
            num: { type: GraphQLInt },
            book: {
                type: new GraphQLObjectType({
                    name: 'Book',
                    fields: function fields() {
                        return {
                            name: { type: GraphQLString },
                            abbrv: { type: GraphQLString },
                            languages: { type: GraphQLString }
                        };
                    }
                })

            },
            lyrics: { type: GraphQLString },
            lyrics_Markdown: {
                type: new GraphQLObjectType({
                    name: 'Markdown',
                    fields: function fields() {
                        return {
                            md: { type: GraphQLString },
                            html: { type: GraphQLString }
                        };
                    }
                })
            },
            lyrics_Html: { type: GraphQLString },
            tags: { type: GraphQLString },
            videos: { type: GraphQLString },
            references: {
                type: new GraphQLObjectType({
                    name: 'References',
                    fields: function fields() {
                        return {
                            author: { type: GraphQLString },
                            book: { type: GraphQLString },
                            year: { type: GraphQLString }
                        };
                    }

                })
            },
            partitions: { type: GraphQLString },
            language: { type: GraphQLString },
            songId: { type: GraphQLString }
        };
    },
    interfaces: function interfaces() {
        return [nodeInterface];
    }
});

var _connectionDefinition = connectionDefinitions({ nodeType: SongType }),
    songConnection = _connectionDefinition.connectionType;

module.exports = SongType;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var async = __webpack_require__(42),
    keystone = __webpack_require__(1);

var Song = keystone.list('Song');
var _ = __webpack_require__(2);
/**
 * List Songs
 */
exports.list = function (req, res) {
    console.log(_.capitalize(req.params.book));
    Song.model.find({ 'book.abbrv': _.upperCase(req.params.book) }, function (err, items) {

        if (err) return res.apiError('database error', err);

        res.send({
            songs: items
        });
    });
};

/**
 * Get Song by ID
 */
exports.get = function (req, res) {
    console.log(req.params.id);
    Song.model.findById(req.params.id).exec(function (err, item) {

        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');

        res.send({
            song: item
        });
    });
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {
	"name": "cesperance-backend",
	"version": "0.0.0",
	"private": true,
	"dependencies": {
		"async": "2.1.4",
		"babel-relay-plugin": "^0.11.0",
		"bluebird": "^3.5.0",
		"body-parser": "^1.17.1",
		"cloudinary": "1.7.0",
		"compression": "^1.6.2",
		"connect-history-api-fallback": "^1.3.0",
		"connect-mongo": "^1.3.2",
		"cookie-parser": "^1.4.3",
		"cors": "^2.8.1",
		"dotenv": "4.0.0",
		"express": "^4.15.2",
		"express-graphql": "^0.6.3",
		"express-handlebars": "3.0.0",
		"express-session": "^1.15.1",
		"geolocator": "^2.1.1",
		"graphql": "^0.9.1",
		"graphql-relay": "^0.5.1",
		"handlebars": "4.0.6",
		"hbs": "^4.0.1",
		"isomorphic-relay": "^0.7.4",
		"isomorphic-relay-router": "^0.8.6",
		"keystone": "^4.0.0-beta.5",
		"lodash": "^4.13.1",
		"markdown": "^0.5.0",
		"moment": "2.17.1",
		"mongoose": "^4.8.6",
		"node-fetch": "^1.6.3",
		"node-sass": "4.5.0",
		"node-sass-middleware": "0.11.0",
		"react": "^15.4.2",
		"react-bootstrap": "^0.30.8",
		"react-dom": "^15.4.2",
		"react-icons": "^2.2.3",
		"react-relay": "^0.10.0",
		"react-router": "^3.0.2",
		"react-router-relay": "^0.13.5",
		"request-ip": "^2.0.1",
		"serve-favicon": "^2.4.1",
		"validator": "^7.0.0"
	},
	"devDependencies": {
		"babel-core": "^6.23.1",
		"babel-loader": "^6.4.0",
		"babel-plugin-transform-react-constant-elements": "^6.23.0",
		"babel-plugin-transform-react-inline-elements": "^6.22.0",
		"babel-preset-latest": "^6.22.0",
		"babel-preset-react": "^6.23.0",
		"babel-preset-stage-0": "^6.22.0",
		"eslint": "3.15.0",
		"eslint-config-keystone": "^3.0.0",
		"eslint-plugin-react": "^5.1.1",
		"webpack": "^2.2.1"
	},
	"scripts": {
		"lint": "eslint .",
		"start": "npm run build:server && nodemon server.bundle.js",
		"build:server": "webpack --config webpack.server.config.js"
	},
	"graphql": {
		"request": {
			"url": "https://localhost:3000/graphql"
		}
	}
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-relay-router");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("react-addons-css-transition-group");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("react-router-relay");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
__webpack_require__(20).config();

// Require keystone
var keystone = __webpack_require__(1);
var handlebars = __webpack_require__(22);
var compression = __webpack_require__(15);
var cors = __webpack_require__(19);
var bodyParser = __webpack_require__(8);
var cookieParser = __webpack_require__(18);
var session = __webpack_require__(23);
var MongoStore = __webpack_require__(17)(session);
var express = __webpack_require__(21);
var path = __webpack_require__(9);
var favicon = __webpack_require__(26);
var mongoose = __webpack_require__(24);
var Promise = __webpack_require__(14);
var requestIp = __webpack_require__(25);
var history = __webpack_require__(16);
var app = express();

keystone.mongoose = Promise.promisifyAll(mongoose);

app.use(express.static('public'));
app.use(express.static('images'));
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(requestIp.mw());

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
	_: __webpack_require__(2),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});
keystone.set('routes', __webpack_require__(13));

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
	songs: 'songs'
});

keystone.start();

/***/ })
/******/ ]);