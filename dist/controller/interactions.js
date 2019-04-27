'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unblock = exports.block = exports.unfollow = exports.follow = undefined;

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var follow = exports.follow = function follow(req, res) {
    var me = (0, _xss2.default)(req.authData.username);
    var target = (0, _xss2.default)(req.params.username);

    var findQuery1 = {
        username: me, followee: { $ne: target }
    };

    var findQuery2 = {
        username: { $eq: target }
    };

    var update1 = {
        $push: { followee: target }
    };

    var update2 = {
        $push: { followers: me }
    };

    _users2.default.findOneAndUpdate(findQuery1, update1, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _users2.default.findOneAndUpdate(findQuery2, update2, function (err, doc) {
                if (err) {
                    _logger2.default.error('Database error: ', err);
                    return res.boom.badImplementation(_messages2.default['m500.0']);
                } else if (doc) {
                    _logger2.default.debug('User with ' + target + ' now following ' + me + ' ');
                    return res.status(201).json({
                        followee: me,
                        followers: target
                    });
                } else {
                    _logger2.default.debug('User does not exist');
                    return res.boom.notFound(_messages2.default['m404.0']);
                }
            });
        } else {
            _logger2.default.debug('User does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};

var unfollow = exports.unfollow = function unfollow(req, res) {
    var me = (0, _xss2.default)(req.authData.username);
    var target = (0, _xss2.default)(req.params.username);

    var findQuery1 = {
        username: me, followee: { $eq: target }
    };

    var findQuery2 = {
        username: { $eq: target }
    };

    var update1 = {
        $pull: { followee: target }
    };

    var update2 = {
        $pull: { followers: me }
    };

    _users2.default.findOneAndUpdate(findQuery1, update1, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _users2.default.findOneAndUpdate(findQuery2, update2, function (err, doc) {
                if (err) {
                    _logger2.default.error('Database error: ', err);
                    return res.boom.badImplementation(_messages2.default['m500.0']);
                } else if (doc) {
                    _logger2.default.debug('User with ' + target + ' not following ' + me + ' ');
                    return res.status(201).json({
                        followee: me,
                        followers: target
                    });
                } else {
                    _logger2.default.debug('User does not exist');
                    return res.boom.notFound(_messages2.default['m404.0']);
                }
            });
        } else {
            _logger2.default.debug('User does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};

var block = exports.block = function block(req, res) {
    var me = (0, _xss2.default)(req.authData.username);
    var target = (0, _xss2.default)(req.params.username);

    var findQuery = {
        username: me, blocked: { $ne: target }
    };

    var update = {
        $push: { blocked: target }
    };

    _users2.default.findOneAndUpdate(findQuery, update, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _logger2.default.debug('User with ' + target + ' username blocked by ' + me + ' username ');
            return res.status(201).json({
                blocked: target
            });
        } else {
            _logger2.default.debug('User does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};

var unblock = exports.unblock = function unblock(req, res) {
    var me = (0, _xss2.default)(req.authData.username);
    var target = (0, _xss2.default)(req.params.username);

    var findQuery = {
        username: me, blocked: { $eq: target }
    };

    var update = {
        $pull: { blocked: target }
    };

    _users2.default.findOneAndUpdate(findQuery, update, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _logger2.default.debug('User with ' + target + ' username unblocked by ' + me + ' username ');
            return res.status(201).json({
                unblocked: target
            });
        } else {
            _logger2.default.debug('User does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};
//# sourceMappingURL=interactions.js.map