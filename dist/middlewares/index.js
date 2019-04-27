'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resizePostImage = exports.resizeImage = exports.uploadPostImage = exports.upload = exports.checkAuth = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkAuth = exports.checkAuth = function checkAuth(req, res, next) {
    var token = req.headers['authorization'];

    if (token) {
        _jsonwebtoken2.default.verify(token, _config2.default.JWT_TOKEN, function (err, authData) {
            if (err) {
                _logger2.default.error('JWT Error: ', err);
                return res.badImplementation(_messages2.default['m500.0']);
            }
            var findQuery = {
                '_id': { $eq: _mongoose2.default.Types.ObjectId(authData.obj_id) },
                'username': { $eq: authData.username },
                'tokenHash': { $eq: authData.hash }
            };

            var selected = { _id: 1 };

            _users2.default.findOne(findQuery, selected, function (err, doc) {
                if (err) {
                    _logger2.default.error('Database Error: ', err);
                    return res.boom.badImplementation(_messages2.default['m500.0']);
                } else if (doc) {
                    req.authData = authData;
                    next();
                } else {
                    _logger2.default.debug('User with ' + authData.username + ' does not exist');
                    return res.boom.notFound(_messages2.default['m404.0']);
                }
            });
        });
    } else {
        return res.boom.unauthorized(_messages2.default['m401.1']);
    }
};

var upload = exports.upload = (0, _multer2.default)({
    dest: 'images/raw/',
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: function fileFilter(req, file, callback) {
        var ext = _path2.default.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            _logger2.default.debug('Invalid image');
            return callback(new Error('Only images are allowed'));
        }
        _logger2.default.debug('Uploading image');
        callback(null, true);
    }
});

var uploadPostImage = exports.uploadPostImage = (0, _multer2.default)({
    dest: 'posts/raw/',
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: function fileFilter(req, file, callback) {
        var ext = _path2.default.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            _logger2.default.debug('Invalid image');
            return callback(new Error('Only images are allowed'));
        }
        _logger2.default.debug('Uploading image');
        callback(null, true);
    }
});

var resizeImage = exports.resizeImage = function resizeImage(req, res, next) {
    var path = req.file.path;
    var name = path.split('/')[2];

    (0, _sharp2.default)(path).resize(200, 200, {}).toFile('images/r200x200/' + name).then(function (_) {
        _logger2.default.debug('Resizing image to 200x200');
        (0, _sharp2.default)(path).resize(48, 48, {}).toFile('images/r48x48/' + name).then(function (_) {
            _logger2.default.debug('Resizing image to 48x48');
            next();
        });
    }).catch(function (err) {
        _logger2.default.error('Error in resizing the image: ', err);
    });
};

var resizePostImage = exports.resizePostImage = function resizePostImage(req, res, next) {
    var path = req.file.path;
    var name = path.split('/')[2];

    (0, _sharp2.default)(path).resize(500, 500, {}).toFile('posts/r500x500/' + name).then(function (_) {
        _logger2.default.debug('Resizing image to 500x500');
        next();
    }).catch(function (err) {
        _logger2.default.error('Error in resizing the image: ', err);
    });
};
//# sourceMappingURL=index.js.map