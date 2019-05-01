'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deletePost = exports.editPost = exports.addPost = exports.getPotsById = exports.getPosts = undefined;

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _posts = require('../models/posts');

var _posts2 = _interopRequireDefault(_posts);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPosts = exports.getPosts = function getPosts(req, res) {
    var page = Number((0, _xss2.default)(req.query.page));
    var limit = Number((0, _xss2.default)(req.query.limit));

    if (!page || page < 0) page = 0;
    if (!limit || limit <= 0) limit = 10;

    console.log({ limit: limit, skip: page * limit });

    var selectedField = {
        author: 1, content: 1, caption: 1, createdAt: 1, updatedAt: 1, _id: 1
    };

    _posts2.default.find({}, selectedField, { limit: limit, skip: page * limit }, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else {
            _logger2.default.debug('Returning some posts');
            return res.status(200).json(doc);
        }
    });
};

var getPotsById = exports.getPotsById = function getPotsById(req, res) {
    var findQuery = {
        _id: { $eq: (0, _xss2.default)(req.params.id) }
    };

    var selectedField = {
        author: 1, content: 1, caption: 1, createdAt: 1, updatedAt: 1, _id: 1
    };

    _posts2.default.findOne(findQuery, selectedField, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else {
            _logger2.default.debug('Returning some posts');
            return res.status(200).json(doc);
        }
    });
};

var addPost = exports.addPost = function addPost(req, res) {
    req.check('caption', 'Invalid caption').isString().isLength({ min: 4, max: 255 }).optional();

    var errors = req.validationErrors();
    if (errors) {
        _logger2.default.debug('Validation didn\'t succeed');
        return res.boom.badRequest(_messages2.default['m400.2'], errors);
    }

    var data = {
        _id: new _mongoose2.default.Types.ObjectId(),
        author: (0, _xss2.default)(req.authData.username),
        content: req.file.filename,
        caption: (0, _xss2.default)(req.body.caption)
    };

    var post = new _posts2.default(data);

    post.save(function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _logger2.default.debug('Post added');
            return res.status(201).json({
                _id: doc._id,
                author: doc.author,
                content: doc.content,
                caption: doc.caption,
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt
            });
        }
    });
};

var editPost = exports.editPost = function editPost(req, res) {
    req.check('caption', 'Invalid caption').isString().isLength({ min: 4, max: 255 });

    var errors = req.validationErrors();
    if (errors) {
        _logger2.default.debug('Validation didn\'t succeed');
        return res.boom.badRequest(_messages2.default['m400.2'], errors);
    }

    var findQuery = {
        _id: { $eq: _mongoose2.default.Types.ObjectId(req.params.id) }
    };

    var data = {};

    if (req.body.caption) data['caption'] = (0, _xss2.default)(req.body.caption);

    data['updatedAt'] = Date();

    _posts2.default.findOneAndUpdate(findQuery, data, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            return res.status(201).json(data);
        } else {
            _logger2.default.debug('Post with ' + req.params.id + ' does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};

var deletePost = exports.deletePost = function deletePost(req, res) {
    var findQuery = {
        _id: { $eq: _mongoose2.default.Types.ObjectId(req.params.id) }
    };

    _posts2.default.findOneAndRemove(findQuery, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            return res.status(204).json({
                deleted: req.params.id
            });
        } else {
            _logger2.default.debug('Post with ' + req.params.id + ' does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};
//# sourceMappingURL=posts.js.map