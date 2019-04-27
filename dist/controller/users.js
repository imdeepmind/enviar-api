'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAll = exports.getOne = undefined;

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getOne = exports.getOne = function getOne(req, res) {
    var findQuery2 = {
        username: { $eq: (0, _xss2.default)(req.authData.username) }
    };

    var selectedField = {
        username: 1, name: 1, email: 1, city: 1, state: 1, country: 1,
        gender: 1, dob: 1, avatar: 1, status: 1, bio: 1,
        createdAt: 1, updatedAt: 1, isActive: 1, followee: 1, followers: 1
    };

    var selectedField2 = {
        blocked: 1,
        followee: 1,
        followers: 1
    };

    _users2.default.findOne(findQuery2, selectedField2, function (err, doc1) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else {
            if (!doc1.blocked.includes(req.params.username)) {
                var findQuery = {
                    username: { $eq: (0, _xss2.default)(req.params.username) }
                };

                _users2.default.findOne(findQuery, selectedField, function (err, doc) {
                    if (err) {
                        _logger2.default.error('Database error: ', err);
                        return res.boom.badImplementation(_messages2.default['m500.0']);
                    } else if (doc) {
                        _logger2.default.debug('Returned with user ' + doc.username);

                        var data = doc.toJSON();

                        if (doc1.followers.includes(req.authData.username)) data['isFollowers'] = true;else data['isFollowers'] = false;

                        if (doc1.followee.includes(req.authData.username)) data.isFollowee = true;else data.isFollowee = false;

                        if (doc1.blocked.includes(req.authData.username)) data.isBlocked = true;else data.isBlocked = false;

                        return res.status(200).json(data);
                    } else {
                        _logger2.default.debug('User with ' + doc.username + ' does not exist');
                        return res.boom.notFound(_messages2.default['m404.0']);
                    }
                });
            } else {
                _logger2.default.debug('User with ' + req.params.username + ' does not exist');
                return res.boom.notFound(_messages2.default['m404.0']);
            }
        }
    });
};

var getAll = exports.getAll = function getAll(req, res) {
    var page = (0, _xss2.default)(req.query.page);
    var limit = (0, _xss2.default)(req.query.limit);

    if (!page || page < 0) page = 0;
    if (!limit || limit <= 0) limit = 10;

    var findQuery2 = {
        username: { $eq: (0, _xss2.default)(req.authData.username) }
    };

    var selectedField = {
        username: 1, name: 1, email: 1, city: 1, state: 1, country: 1,
        gender: 1, dob: 1, avatar: 1, status: 1, bio: 1,
        createdAt: 1, updatedAt: 1, isActive: 1, followee: 1, followers: 1
    };

    var selectedField2 = {
        blocked: 1,
        followee: 1,
        followers: 1
    };

    _users2.default.findOne(findQuery2, selectedField2, function (err, doc1) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else {
            var findQuery = {};
            if (doc1.blocked.length > 0) {
                findQuery = _defineProperty({
                    username: { $ne: (0, _xss2.default)(req.authData.username) }
                }, 'username', { $ne: doc1.blocked });
            } else {
                findQuery = {
                    username: { $ne: (0, _xss2.default)(req.authData.username) }
                };
            }

            _users2.default.find(findQuery, selectedField, { limit: limit, skip: page * limit }, function (err, doc) {
                if (err) {
                    _logger2.default.error('Database error: ', err);
                    return res.boom.badImplementation(_messages2.default['m500.0']);
                } else if (doc) {
                    _logger2.default.debug('Returned some users');

                    var data = [];

                    for (var i = 0; i < doc.length; i++) {
                        var dt = doc[i].toJSON();
                        if (doc1.followers.includes(dt.username)) dt['isFollowers'] = true;else dt['isFollowers'] = false;

                        if (doc1.followee.includes(dt.username)) dt.isFollowee = true;else dt.isFollowee = false;

                        if (doc1.blocked.includes(dt.username)) dt.isBlocked = true;else dt.isBlocked = false;

                        data.push(dt);
                    }

                    return res.status(200).json(data);
                } else {
                    _logger2.default.debug('User with ' + doc.username + ' does not exist');
                    return res.boom.notFound(_messages2.default['m404.0']);
                }
            });
        }
    });
};
//# sourceMappingURL=users.js.map