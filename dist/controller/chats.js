'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteChat = exports.postChat = exports.getChat = exports.getChats = undefined;

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chats = require('../models/chats');

var _chats2 = _interopRequireDefault(_chats);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getChats = exports.getChats = function getChats(req, res) {
    var page = (0, _xss2.default)(req.query.page);
    var limit = (0, _xss2.default)(req.query.limit);

    if (!page || page < 0) page = 0;
    if (!limit || limit <= 0) limit = 10;

    var me = (0, _xss2.default)(req.authData.username);
    var findQuery = {
        $or: [{ 'author': { $eq: me } }, { 'to': { $eq: me } }]
    };

    var selectedField = {
        _id: 1, author: 1, to: 1, message: 1, createdAt: 1
    };

    _chats2.default.find(findQuery, selectedField, { limit: limit, skip: page * limit }, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else {
            _logger2.default.debug('Returning some chats');
            return res.status(200).json(doc);
        }
    });
};

var getChat = exports.getChat = function getChat(req, res) {
    var findQuery = {
        $or: [{ 'author': { $eq: me } }, { 'to': { $eq: me } }],
        _id: _mongoose2.default.Schema.Types.ObjectId(req.params.id)
    };

    var selectedField = {
        _id: 1, author: 1, to: 1, message: 1, createdAt: 1
    };

    _chats2.default.find(findQuery, selectedField, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else {
            _logger2.default.debug('Returning some chats');
            return res.status(200).json(doc);
        }
    });
};

var postChat = exports.postChat = function postChat(req, res) {
    req.check('message', 'Invalid message').isString().isLength({ min: 4, max: 255 });

    var errors = req.validationErrors();
    if (errors) {
        _logger2.default.debug('Validation didn\'t succeed');
        return res.boom.badRequest(_messages2.default['m400.2'], errors);
    }

    var findQuery = {
        'username': { $eq: (0, _xss2.default)(req.authData.username) }
    };

    var selectedField = { _id: 1, blocked: 1 };

    _users2.default.findOne(findQuery, selectedField, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else {
            if (doc.blocked.includes(req.params.username)) {
                _logger2.default.debug('user blocked');
                return res.boom.badRequest(_messages2.default['m400.3']);
            } else {
                var newChat = new _chats2.default({
                    _id: new _mongoose2.default.Types.ObjectId(),
                    author: (0, _xss2.default)(req.authData.username),
                    to: (0, _xss2.default)(req.params.username),
                    message: (0, _xss2.default)(req.body.message)
                });

                newChat.save(function (err, doc) {
                    if (err) {
                        _logger2.default.error('Database error: ', err);
                        return res.boom.badImplementation(_messages2.default['m500.0']);
                    } else {
                        res.status(201).json({
                            author: (0, _xss2.default)(req.authData.username),
                            to: (0, _xss2.default)(req.params.username),
                            message: (0, _xss2.default)(req.body.message)
                        });
                    }
                });
            }
        }
    });
};

var deleteChat = exports.deleteChat = function deleteChat(req, res) {
    var findQuery = {
        _id: new _mongoose2.default.Schema.Types.ObjectId(req.params.id),
        author: { $eq: req.authData.username }
    };

    _chats2.default.findOneAndRemove(findQuery, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            return res.status(200).json({
                id: req.params.id
            });
        } else {
            _logger2.default.debug('message don\'t exist');
            return res.boom.notFound(_messages2.default['m404.m404.2']);
        }
    });
};
//# sourceMappingURL=chats.js.map