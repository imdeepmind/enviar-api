'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updatePassword = undefined;

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _hash = require('../utils/hash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updatePassword = exports.updatePassword = function updatePassword(req, res) {
    req.check('old', 'Invalid old password').isString().isLength({ min: 4, max: 24 }).isAlphanumeric();
    req.check('new', 'Invalid new password').isString().isLength({ min: 4, max: 24 }).isAlphanumeric();

    var errors = req.validationErrors();
    if (errors) {
        _logger2.default.debug('Validation didn\'t succeed');
        return res.boom.badRequest(_messages2.default['m400.2'], errors);
    }

    var findQuery = {
        username: { $eq: (0, _xss2.default)(req.authData.username) }
    };

    (0, _hash.generatePasswordHash)(req.body.old).then(function (hash) {
        (0, _hash.comparePassword)(hash, req.body.new).then(function (_) {
            (0, _hash.generatePasswordHash)(req.body.new).then(function (hash) {
                var update = {
                    password: hash
                };
                _users2.default.findOneAndUpdate(findQuery, update, function (err, doc) {
                    if (err) {
                        _logger2.default.error('Database error: ', err);
                        return res.boom.badImplementation(_messages2.default['m500.0']);
                    } else if (doc) {
                        _logger2.default.debug('Updated user with ' + doc.username + ' username');
                        return res.status(200).json({
                            name: doc.name,
                            username: doc.username,
                            email: doc.email,
                            country: doc.country,
                            dob: doc.dob,
                            gender: doc.gender,
                            city: doc.city,
                            state: doc.state,
                            status: doc.status,
                            bio: doc.bio,
                            avatar: doc.avatar
                        });
                    } else {
                        _logger2.default.debug('User with ' + req.authData.username + ' does not exist');
                        return res.boom.notFound(_messages2.default['m404.0']);
                    }
                });
            }).catch(function (err) {
                _logger2.default.error('JWT Error: ', err);
                return res.badImplementation(_messages2.default['m500.0']);
            });
        }).catch(function (err) {
            if (err === 'm401.0') {
                _logger2.default.debug('Wrong password');
                return res.boom.unauthorized(_messages2.default['m401.0']);
            } else if (err == 'm500.0') {
                _logger2.default.error('JWT Error: ', err);
                return res.badImplementation(_messages2.default['m500.0']);
            }
        });
    }).catch(function (err) {
        _logger2.default.error('JWT Error: ', err);
        return res.badImplementation(_messages2.default['m500.0']);
    });
};
//# sourceMappingURL=settings.js.map