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
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-relay");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("keystone");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(3);
var logger = __webpack_require__(11);

var buildFind = function buildFind(model, args, opts, doc) {
    if (args.id) {
        args._id = args.id;
        delete args.id;
    }
    var query = {
        model: model,
        where: {},
        projection: {},
        skip: {},
        limit: {},
        sort: {},
        doc: doc
    };
    if (opts !== null) {
        if (opts.sort) query.sort = opts.sort;
    }
    query.where = args;
    var data = {};
    return query.model.find(query.where).sort(query.sort).execAsync().then(function (results) {
        return results;
    }).catch(function (err) {
        logger.log('error', err);
    });
};
var buildFindOne = function buildFindOne(model, args, opts, doc) {

    var query = {
        model: model,
        where: {},
        projection: {},
        skip: {},
        limit: {},
        sort: {},
        doc: doc
    };
    if (opts !== null) {
        if (opts.sort) query.sort = opts.sort;
    }
    query.where = args;
    var data = {};
    return query.model.findByIdAsync(args.id).then(function (result) {
        return result;
    }).catch(function (err) {
        logger.log('error', err);
    });
};

var queryBuilder = function queryBuilder(op, model, args, opts, doc) {

    switch (op) {

        case 'FIND':
            return buildFind(model, args, opts, doc);

        case 'FIND_ONE':
            return buildFindOne(model, args, opts, doc);
        default:
            break;
    }
    return {};
};

module.exports = queryBuilder;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(4),
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

var _require3 = __webpack_require__(15),
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

module.exports = SongType;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winston = __webpack_require__(17);
__webpack_require__(55);

var logger = new winston.Logger({
    transports: [
    /*        new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            }),*/
    new winston.transports.DailyRotateFile({
        filename: 'cesperance-backend.log.',
        datePattern: 'yyyy-MM-dd',
        prepend: false,
        level: 'info'
    }), new winston.transports.DailyRotateFile({
        name: 'error-file',
        filename: 'cesperance-backend-error.log',
        level: 'error'
    })],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function write(message, encoding) {
        logger.info(message);
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(5);

var _classnames = __webpack_require__(16);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = function (_React$Component) {
    _inherits(SearchBar, _React$Component);

    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this.state = {
            placeholder: 'Search'

        };
        return _this;
    }

    _createClass(SearchBar, [{
        key: 'render',
        value: function render() {
            var formClass = (0, _classnames2.default)('search-bar', this.props.formClass);
            return _jsx('div', {}, void 0, _jsx(_reactBootstrap.Form, {
                className: formClass,
                style: this.props.style
            }, void 0, _jsx(_reactBootstrap.FormGroup, {}, void 0, _jsx(_reactBootstrap.FormControl, {
                type: 'text',
                placeholder: this.props.placeholder || this.state.placeholder,
                onChange: this.props.onChange
            }))));
        }
    }]);

    return SearchBar;
}(_react2.default.Component);

exports.default = SearchBar;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(4),
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

var keystone = __webpack_require__(2);
var db = __webpack_require__(9);
var SongType = __webpack_require__(10);

var _nodeDefinitions = nodeDefinitions(function (globalId) {
    var _fromGlobalId = fromGlobalId(globalId),
        type = _fromGlobalId.type,
        id = _fromGlobalId.id;

    console.log('TYPE: ' + type);
    switch (type) {
        case 'Song':
            return db('FIND_ONE', keystone.list('Song').model, { id: id }, null);
        default:
            return null;
    }
}, function (obj) {
    return 'Song';
}),
    nodeInterface = _nodeDefinitions.nodeInterface,
    nodeField = _nodeDefinitions.nodeField;

module.exports = { nodeInterface: nodeInterface, nodeField: nodeField };

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// React And Redux Setup

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(53);

var _server2 = _interopRequireDefault(_server);

var _reactRouter = __webpack_require__(7);

var _routes = __webpack_require__(38);

var _routes2 = _interopRequireDefault(_routes);

var _graphqlHTTP = __webpack_require__(44);

var _graphqlHTTP2 = _interopRequireDefault(_graphqlHTTP);

var _bodyParser = __webpack_require__(12);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _reactRelay = __webpack_require__(1);

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _isomorphicRelayRouter = __webpack_require__(50);

var _isomorphicRelayRouter2 = _interopRequireDefault(_isomorphicRelayRouter);

var _path = __webpack_require__(13);

var _path2 = _interopRequireDefault(_path);

var _winston = __webpack_require__(17);

var _winston2 = _interopRequireDefault(_winston);

var _songs = __webpack_require__(47);

var _songs2 = _interopRequireDefault(_songs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GRAPHQL_URL = 'http://localhost:4088/graphql';
// api


var networkLayer = new _reactRelay2.default.DefaultNetworkLayer(GRAPHQL_URL);
// Setup Route Bindings
exports = module.exports = function (app) {
    app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlHTTP2.default)());
    // Views
    _winston2.default.log('info', __dirname);
    app.get('/api/songs/id/:id', _songs2.default.get);
    app.get('/api/songs/:book', _songs2.default.list);

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
            res.render('index.ejs', {
                preloadedData: data,
                reactOutput: reactOutput
            });
        }
    });
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("connect-history-api-fallback");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("request-ip");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

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

var _reactAddonsCssTransitionGroup = __webpack_require__(51);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Header = __webpack_require__(35);

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

var _reactBootstrap = __webpack_require__(5);

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
                href: '/'
            }, void 0, 'Chants d\'Esp\xE9rance')), _jsx(_reactBootstrap.Navbar.Toggle, {})), _jsx(_reactBootstrap.Navbar.Collapse, {}, void 0, _jsx(_reactBootstrap.Nav, {}, void 0, _jsx(_reactBootstrap.NavItem, {
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = undefined;

var _reactRelay = __webpack_require__(1);

var _reactRelay2 = _interopRequireDefault(_reactRelay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queries = exports.queries = { song: function song() {
    return function () {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'ID!'
          },
          name: 'id',
          value: {
            kind: 'CallVariable',
            callVariableName: 'id'
          }
        }],
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }, {
          fieldName: '__typename',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'String'
        }],
        fieldName: 'node',
        kind: 'Query',
        metadata: {
          isAbstract: true,
          identifyingArgName: 'id',
          identifyingArgType: 'ID!'
        },
        name: 'Song',
        type: 'Node'
      };
    }();
  } };

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = undefined;

var _reactRelay = __webpack_require__(1);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
/* Relay */


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(52);

var _reactRouter = __webpack_require__(7);

var _App = __webpack_require__(40);

var _App2 = _interopRequireDefault(_App);

var _Home = __webpack_require__(41);

var _Home2 = _interopRequireDefault(_Home);

var _SongsList = __webpack_require__(43);

var _SongsList2 = _interopRequireDefault(_SongsList);

var _Song = __webpack_require__(42);

var _Song2 = _interopRequireDefault(_Song);

var _About = __webpack_require__(39);

var _About2 = _interopRequireDefault(_About);

var _Base = __webpack_require__(34);

var _Base2 = _interopRequireDefault(_Base);

var _Songs = __webpack_require__(37);

var _Song3 = __webpack_require__(36);

var _reactRelay = __webpack_require__(1);

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _reactRouterRelay = __webpack_require__(54);

var _reactRouterRelay2 = _interopRequireDefault(_reactRouterRelay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactRelay2.default.injectNetworkLayer(new _reactRelay2.default.DefaultNetworkLayer('http://localhost:4088/graphql'));

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
    path: '/songs/:book',
    component: _SongsList2.default,
    queries: _Songs.queries
}, void 0), _jsx(_reactRouter.Route, {
    path: '/songs/:book/:id',
    component: _Song2.default,
    queries: _Song3.queries
})));

/***/ }),
/* 39 */
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NavLink = __webpack_require__(8);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(5);

var _SearchBar = __webpack_require__(14);

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _NavLink = __webpack_require__(8);

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
                to: '/songs/ce'
            }, void 0, _jsx('img', {
                src: '/images/ce.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance'))), _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/songs/mj'
            }, void 0, _jsx('img', {
                src: '/images/mj.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance')))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/songs/ee'
            }, void 0, _jsx('img', {
                src: '/images/ee.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance'))), _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/songs/vr'
            }, void 0, _jsx('img', {
                src: '/images/vr.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance')))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/songs/hc'
            }, void 0, _jsx('img', {
                src: '/images/hc.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance'))), _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/songs/rn'
            }, void 0, _jsx('img', {
                src: '/images/rn.png',
                style: { maxWidth: 60 }
            }), _jsx('h5', {}, void 0, ' Chant d\'Esperance')))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                xs: 6
            }, void 0, _jsx(_NavLink2.default, {
                to: '/songs/ga'
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRelay = __webpack_require__(1);

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _reactBootstrap = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Song = function (_React$Component) {
    _inherits(Song, _React$Component);

    function Song() {
        _classCallCheck(this, Song);

        return _possibleConstructorReturn(this, (Song.__proto__ || Object.getPrototypeOf(Song)).apply(this, arguments));
    }

    _createClass(Song, [{
        key: 'render',
        value: function render() {
            return _jsx(_reactBootstrap.Grid, {}, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                md: 12,
                className: 'title'
            }, void 0, _jsx('h2', {}, void 0, this.props.song.num + '. ' + this.props.song.title))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                md: 12
            }, void 0, _jsx('span', {
                dangerouslySetInnerHTML: { __html: this.props.song.lyrics_Markdown.html },
                className: 'lyrics'
            }))));
        }
    }]);

    return Song;
}(_react2.default.Component);

exports.default = _reactRelay2.default.createContainer(Song, {
    initialVariables: { id: '' },
    prepareVariables: function prepareVariables(prevVariables) {
        return { id: prevVariables.id };
    },
    fragments: {

        song: function song() {
            return function () {
                return {
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
                    id: _reactRelay2.default.QL.__id(),
                    kind: 'Fragment',
                    metadata: {},
                    name: 'Song_SongRelayQL',
                    type: 'Song'
                };
            }();
        }
    }
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRelay = __webpack_require__(1);

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _reactBootstrap = __webpack_require__(5);

var _SearchBar = __webpack_require__(14);

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _classnames = __webpack_require__(16);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = __webpack_require__(7);

var _NavLink = __webpack_require__(8);

var _NavLink2 = _interopRequireDefault(_NavLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SongsList = function (_React$Component) {
    _inherits(SongsList, _React$Component);

    function SongsList(props) {
        _classCallCheck(this, SongsList);

        var _this = _possibleConstructorReturn(this, (SongsList.__proto__ || Object.getPrototypeOf(SongsList)).call(this, props));

        _this._renderSongs = function () {
            return _this.state.filteredData.map(function (_ref) {
                var node = _ref.node;

                return _jsx(_reactBootstrap.ListGroupItem, {
                    className: _this.props.params.book
                }, void 0, _jsx(_NavLink2.default, {
                    to: _this.props.location.pathname + '/' + node.id
                }, void 0, node.num + '. ' + node.title));
            });
        };

        _this._fetchLanguage = function (event) {

            var lang = event.target.value;
            if (_this.state.activeLanguage !== lang) {

                _this.setState({
                    activeLanguage: lang
                }, function () {
                    _this.props.relay.setVariables({
                        lang: lang
                    });
                });
            }
        };

        _this._handleSongSelect = function (e) {
            _this.context.router.push(path);
        };

        _this._filterSongs = function (e) {
            var value = e.target.value;
            var str = _this._removeAccentsByRegex(value);
            var filtered = _this.state.data.filter(function (song) {
                console.log();
                return _this._removeAccentsByRegex(_lodash2.default.lowerCase(song.node.title + ' ' + song.node.num)).indexOf(_lodash2.default.lowerCase(str)) > -1;
            });
            console.log(filtered);
            _this.setState({
                filteredData: filtered
            });
        };

        _this._removeAccentsByRegex = function (s) {
            var r = _lodash2.default.lowerCase(s);
            r = r.replace(new RegExp("\\s", 'g'), "");
            r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
            r = r.replace(new RegExp("æ", 'g'), "ae");
            r = r.replace(new RegExp("ç", 'g'), "c");
            r = r.replace(new RegExp("[èéêë]", 'g'), "e");
            r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
            r = r.replace(new RegExp("ñ", 'g'), "n");
            r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
            r = r.replace(new RegExp("œ", 'g'), "oe");
            r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
            r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
            r = r.replace(new RegExp("\\W", 'g'), "");
            return r;
        };

        _this.state = {
            borderColorClass: 'ce',
            activeLanguage: 'fr',
            data: [],
            filteredData: []
        };
        _this._fetchLanguage = _this._fetchLanguage.bind(_this);
        return _this;
    }

    _createClass(SongsList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                borderColorClass: this.props.params.book
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                data: this.props.viewer.songs.edges,
                filteredData: this.props.viewer.songs.edges
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.viewer !== nextProps.viewer) {
                this.setState({
                    data: nextProps.viewer.songs.edges,
                    filteredData: nextProps.viewer.songs.edges
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _jsx(_reactBootstrap.Grid, {}, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                sm: 12,
                md: 9,
                className: 'title'
            }, void 0, _jsx('h2', {}, void 0, _jsx('span', {}, void 0, this.props.viewer.songs.edges[0].node.book.name)))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
                sm: 12,
                md: 9
            }, void 0, _jsx(_reactBootstrap.ButtonToolbar, {}, void 0, _jsx(_reactBootstrap.Button, {
                className: (0, _classnames2.default)("button-primary", this.state.activeLanguage === 'fr' ? 'active' : ''),
                value: 'fr',
                onClick: function onClick(e) {
                    return _this2._fetchLanguage(e);
                }
            }, void 0, ' French'), _jsx(_reactBootstrap.Button, {
                className: (0, _classnames2.default)("button-primary", this.state.activeLanguage === 'ht' ? 'active' : ''),
                value: 'ht',
                onClick: function onClick(e) {
                    return _this2._fetchLanguage(e);
                }
            }, void 0, ' Kreol')), _jsx(_SearchBar2.default, {
                style: { width: '100%', paddingBottom: 20 },
                placeholder: 'Filter',
                onChange: function onChange(e) {
                    return _this2._filterSongs(e);
                }
            }), _jsx(_reactBootstrap.ListGroup, {
                className: 'song-list'
            }, void 0, this._renderSongs())), _jsx(_reactBootstrap.Col, {
                smHidden: true,
                md: 3
            }, void 0, _jsx('img', {
                src: 'http://placehold.it/300x150'
            }))));
        }
    }]);

    return SongsList;
}(_react2.default.Component);

SongsList.contextTypes = {
    router: _react2.default.PropTypes.object
};

exports.default = _reactRelay2.default.createContainer(SongsList, {
    initialVariables: { book: "MJ", lang: "fr" },
    prepareVariables: function prepareVariables(prevVariables) {
        return { book: _lodash2.default.upperCase(prevVariables.book), lang: prevVariables.lang };
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
                        }, {
                            kind: 'Call',
                            metadata: {},
                            name: 'language',
                            value: {
                                kind: 'CallVariable',
                                callVariableName: 'lang'
                            }
                        }, {
                            kind: 'Call',
                            metadata: {
                                type: 'Int'
                            },
                            name: 'first',
                            value: {
                                kind: 'CallValue',
                                callValue: 400
                            }
                        }],
                        children: [{
                            children: [{
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
                                        fieldName: 'name',
                                        kind: 'Field',
                                        metadata: {},
                                        type: 'String'
                                    }],
                                    fieldName: 'book',
                                    kind: 'Field',
                                    metadata: {
                                        canHaveSubselections: true
                                    },
                                    type: 'Book'
                                }],
                                fieldName: 'node',
                                kind: 'Field',
                                metadata: {
                                    canHaveSubselections: true,
                                    inferredRootCallName: 'node',
                                    inferredPrimaryKey: 'id',
                                    isRequisite: true
                                },
                                type: 'Song'
                            }, {
                                fieldName: 'cursor',
                                kind: 'Field',
                                metadata: {
                                    isGenerated: true,
                                    isRequisite: true
                                },
                                type: 'String'
                            }],
                            fieldName: 'edges',
                            kind: 'Field',
                            metadata: {
                                canHaveSubselections: true,
                                isPlural: true
                            },
                            type: 'SongEdge'
                        }, {
                            children: [{
                                fieldName: 'hasNextPage',
                                kind: 'Field',
                                metadata: {
                                    isGenerated: true,
                                    isRequisite: true
                                },
                                type: 'Boolean'
                            }, {
                                fieldName: 'hasPreviousPage',
                                kind: 'Field',
                                metadata: {
                                    isGenerated: true,
                                    isRequisite: true
                                },
                                type: 'Boolean'
                            }],
                            fieldName: 'pageInfo',
                            kind: 'Field',
                            metadata: {
                                canHaveSubselections: true,
                                isGenerated: true,
                                isRequisite: true
                            },
                            type: 'PageInfo'
                        }],
                        fieldName: 'songs',
                        kind: 'Field',
                        metadata: {
                            canHaveSubselections: true,
                            isConnection: true
                        },
                        type: 'SongConnection'
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

/*{viewer.songs.map((song) =>
    <div key={song.id}>
        <span>{`${song.num} ${song.title}`}</span>
        <br />
        <span dangerouslySetInnerHTML={{ __html: song.lyrics_Markdown.html }}></span>
        <br />
        <br />
    </div>
)
}*/

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var graphqlHTTP = __webpack_require__(49);
var QueryType = __webpack_require__(45);

var _require = __webpack_require__(4),
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(4),
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

var keystone = __webpack_require__(2);
var SongType = __webpack_require__(10);

var _require3 = __webpack_require__(15),
    nodeInterface = _require3.nodeInterface,
    nodeField = _require3.nodeField;

var db = __webpack_require__(9);
var Viewer = __webpack_require__(46);
/*var Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        songs: {
            type: new GraphQLList(SongType),
            args: {
                book: { type: GraphQLString }
            },
            resolve: (root, args) => db('FIND', keystone.list('Song').model, { 'book.abbrv': args.book }, null).then((collection) => { return collection; }),
        },

    }),
})*/

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
            },
            song: {
                type: SongType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) }
                },
                resolve: function resolve(root, args) {
                    return db('FIND_ONE', keystone.list('Song').model, { 'id': args.id }, null).then(function (result) {
                        console.log(result);return result;
                    });
                }
            }
        };
    }
});

module.exports = QueryType;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = __webpack_require__(4),
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
    connectionFromPromisedArray = _require2.connectionFromPromisedArray,
    cursorForObjectInConnection = _require2.cursorForObjectInConnection,
    fromGlobalId = _require2.fromGlobalId,
    globalIdField = _require2.globalIdField,
    mutationWithClientMutationId = _require2.mutationWithClientMutationId,
    nodeDefinitions = _require2.nodeDefinitions,
    toGlobalId = _require2.toGlobalId;

var keystone = __webpack_require__(2);
var SongType = __webpack_require__(10);
var db = __webpack_require__(9);

var Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: function fields() {
        return {
            songs: {
                type: songConnection,
                args: _extends({}, connectionArgs, {
                    book: { type: GraphQLString },
                    language: { type: GraphQLString }
                }),
                resolve: function resolve(viewer, args) {
                    return connectionFromPromisedArray(db('FIND', keystone.list('Song').model, { 'book.abbrv': args.book, 'language': args.language }, { sort: { num: 1 } }, null).then(function (collection) {
                        return collection;
                    }), args);
                }

            }

        };
    }
});

var _connectionDefinition = connectionDefinitions({
    name: 'Song',
    nodeType: SongType
}),
    songConnection = _connectionDefinition.connectionType;

module.exports = Viewer;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var async = __webpack_require__(48),
    keystone = __webpack_require__(2);

var Song = keystone.list('Song');
var _ = __webpack_require__(3);
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
/* 48 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-relay-router");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("react-addons-css-transition-group");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("react-router-relay");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
__webpack_require__(25).config();
var logger = __webpack_require__(11);
// Require keystone
var keystone = __webpack_require__(2);
var handlebars = __webpack_require__(27);
var compression = __webpack_require__(20);
var cors = __webpack_require__(24);
var bodyParser = __webpack_require__(12);
var cookieParser = __webpack_require__(23);
var session = __webpack_require__(28);
var MongoStore = __webpack_require__(22)(session);
var express = __webpack_require__(26);
var path = __webpack_require__(13);
var favicon = __webpack_require__(33);
var mongoose = __webpack_require__(29);
var Promise = __webpack_require__(19);
var requestIp = __webpack_require__(32);
var history = __webpack_require__(21);
var nconf = __webpack_require__(31);
var app = express();

nconf.file({ file: './config.json' });
logger.log('info', 'STARTING APP');

keystone.mongoose = Promise.promisifyAll(mongoose);
app.get('/js/bundle.js', function (req, res) {
	res.setHeader('Content-Type', 'application/javascript');
	res.sendFile('bundle.js', { root: __dirname + '/' });
});
//app.use(express.static('public'));
app.use(express.static('images'));
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(requestIp.mw());
app.use('/styles/', express.static(path.resolve(__dirname, '..', 'css')));
app.use(__webpack_require__(30)("combined", { "stream": logger.stream }));
keystone.init({
	'name': 'Cesperance-Backend',
	'brand': 'Cesperance-Backend',
	'compress': true,
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'wysiwyg additional buttons': 'preview',
	'wysiwyg additional plugins': 'preview',
	'port': nconf.get('port'),
	'host': nconf.get('host'),
	'mongoose': Promise.promisifyAll(mongoose),
	'mongo options': nconf.get('mongoose').options
});

//keystone.app = app
keystone.import('./lib/server/models');
keystone.set('locals', {
	_: __webpack_require__(3),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});
keystone.set('routes', __webpack_require__(18));

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
	songs: 'songs'
});

keystone.start();
console.log(keystone.mongoose.connection);

/***/ })
/******/ ]);