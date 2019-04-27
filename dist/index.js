'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _expressBoom = require('express-boom');

var _expressBoom2 = _interopRequireDefault(_expressBoom);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _db = require('./utils/db');

var _db2 = _interopRequireDefault(_db);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _index = require('./config/index');

var _index2 = _interopRequireDefault(_index);

var _auth = require('./routes/v1/auth');

var _auth2 = _interopRequireDefault(_auth);

var _me = require('./routes/v1/me');

var _me2 = _interopRequireDefault(_me);

var _settings = require('./routes/v1/settings');

var _settings2 = _interopRequireDefault(_settings);

var _users = require('./routes/v1/users');

var _users2 = _interopRequireDefault(_users);

var _interactions = require('./routes/v1/interactions');

var _interactions2 = _interopRequireDefault(_interactions);

var _posts = require('./routes/v1/posts');

var _posts2 = _interopRequireDefault(_posts);

var _chats = require('./routes/v1/chats');

var _chats2 = _interopRequireDefault(_chats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Logging the NODE_ENV
_logger2.default.info('The API is running as ' + _index2.default.NODE_ENV.toUpperCase());

// Connect the db
(0, _db2.default)();

// Use CORS
app.use((0, _cors2.default)({
    allowedOrigins: [_index2.default.WEB_PASS]
}));

// Body parser
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));

// Validator
app.use((0, _expressValidator2.default)());

// Boom error
app.use((0, _expressBoom2.default)());

// Log Incoming requests
app.all('*', function (req, res, next) {
    _logger2.default.info('Incoming request: ' + req.method + ' ' + req.url);
    return next();
});

// Index route
app.get('/', function (req, res) {
    res.status(200).json({
        'status': 'working',
        'message': 'Welcome dude to enviar'
    });
});

// Routes
app.use('/api/v1/auth', _auth2.default);
app.use('/api/v1/me/', _me2.default);
app.use('/api/v1/settings', _settings2.default);
app.use('/api/v1/users/', _users2.default);
app.use('/api/v1/interactions/', _interactions2.default);
app.use('/api/v1/posts/', _posts2.default);
app.use('/api/v1/chats', _chats2.default);

// Handling invalid routes
app.all('*', function (req, res) {
    _logger2.default.debug('Invalid route');
    return res.boom.notFound(_messages2.default['m404.1']);
});

// The is running at port
app.listen(_index2.default.PORT, function () {
    _logger2.default.info('The API is running at port ' + _index2.default.PORT);
});

exports.default = app;
//# sourceMappingURL=index.js.map