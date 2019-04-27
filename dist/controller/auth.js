'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkEmail = exports.checkUsername = exports.login = exports.register = undefined;

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _hash = require('../utils/hash');

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = exports.register = function register(req, res) {
    req.check('username', 'Invalid username').isString().isLength({ min: 4, max: 24 }).isAlphanumeric();
    req.check('password', 'Invalid password').isString().isLength({ min: 4, max: 24 }).isAlphanumeric().equals(req.body.conformPassword);
    req.check('email', 'Invalid email').isString().isLength({ min: 4, max: 255 }).isEmail();
    req.check('name', 'Invalid name').isString().isLength({ min: 4, max: 255 });
    req.check('gender', 'Invalid gender').isString().isIn(['m', 'f', 'o']);
    req.check('dob', 'Invalid date of birth').isString().isBefore().custom(function (date) {
        return date.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
    });
    req.check('country', 'Invalid country').isString().isLength({ min: 4, max: 255 }).isAlphanumeric();

    var errors = req.validationErrors();
    if (errors) {
        _logger2.default.debug('Validation didn\'t succeed');
        return res.boom.badRequest(_messages2.default['m400.2'], errors);
    }

    var data = {
        username: (0, _xss2.default)(req.body.username),
        password: req.body.password,
        email: (0, _xss2.default)(req.body.email),
        name: (0, _xss2.default)(req.body.name),
        gender: (0, _xss2.default)(req.body.gender),
        country: (0, _xss2.default)(req.body.country),
        dob: (0, _xss2.default)(req.body.dob)
    };

    var findQuery = {
        $or: [{ 'username': { $eq: data.username } }, { 'email': { $eq: data.email } }]
    };
    var what = {
        _id: 1
    };

    _users2.default.findOne(findQuery, what, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _logger2.default.debug('Username ' + data.username + ' exists in the db');
            return res.boom.badRequest(_messages2.default['m400.0']);
        } else {
            (0, _hash.generatePasswordHash)(data.password).then(function (hash) {
                data.password = hash;
                data._id = new _mongoose2.default.Types.ObjectId();
                var u = (0, _users2.default)(data);

                u.save(function (err, doc) {
                    if (err) {
                        _logger2.default.error('Database error: ', err);
                        return res.boom.badImplementation(_messages2.default['m500.0']);
                    } else if (doc) {
                        _logger2.default.debug('User created with username ' + doc.username);
                        return res.status(201).json({
                            name: doc.name,
                            username: doc.username,
                            email: doc.email,
                            country: doc.country,
                            dob: doc.dob,
                            gender: doc.gender
                        });
                    }
                });
            }).catch(function (err) {
                _logger2.default.error('Bcrypt error', err);
                return res.boom.badImplementation(_messages2.default['m500.0']);
            });
        }
    });
};

var login = exports.login = function login(req, res) {
    req.check('username', 'Invalid username').isString().isLength({ min: 4, max: 24 }).isAlphanumeric();
    req.check('password', 'Invalid password').isString().isLength({ min: 4, max: 24 }).isAlphanumeric();

    var errors = req.validationErrors();
    if (errors) {
        _logger2.default.debug('Validation didn\'t succeed');
        return res.boom.badRequest(_messages2.default['m400.2'], errors);
    }

    var data = {
        username: (0, _xss2.default)(req.body.username),
        password: req.body.password
    };

    var findQuery = {
        'username': { $eq: data.username }
    };

    var what = {
        _id: 1, username: 1, password: 1, tokenHash: 1, name: 1, avatar: 1
    };

    _users2.default.findOne(findQuery, what, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            (0, _hash.comparePassword)(doc.password, data.password).then(function (h) {
                var hash = '';
                if (doc.tokenHash) hash = doc.tokenHash;else hash = (0, _hash.generateHash)();

                var update = {
                    tokenHash: hash
                };

                _users2.default.findOneAndUpdate(findQuery, update, function (err, _) {
                    if (err) {
                        _logger2.default.error('Database error: ', err);
                        return res.boom.badImplementation(_messages2.default['m500.0']);
                    } else if (_) {
                        _logger2.default.debug('Login successful');
                        var token = (0, _hash.generateToken)(doc.name, doc.username, hash, doc.avatar, doc._id);
                        return res.status(202).json({
                            token: token
                        });
                    }
                });
            }).catch(function (_) {
                _logger2.default.debug('Wrong password');
                return res.boom.unauthorized(_messages2.default['m401.0']);
            });
        } else {
            _logger2.default.debug('User with ' + data.username + ' does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};

var checkUsername = exports.checkUsername = function checkUsername(req, res) {
    req.check('username', 'Invalid username').isString().isLength({ min: 4, max: 24 }).isAlphanumeric();

    var errors = req.validationErrors();
    if (errors) {
        _logger2.default.debug('Validation didn\'t succeed');
        return res.boom.badRequest(_messages2.default['m400.2'], errors);
    }

    var data = {
        username: (0, _xss2.default)(req.params.username)
    };

    var findQuery = {
        'username': { $eq: data.username }
    };

    var what = {
        _id: 1
    };

    _users2.default.findOne(findQuery, what, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _logger2.default.debug('User with username ' + data.username + ' exist');
            return res.status(200).json({
                'message': _messages2.default['m201.1'],
                'data': true
            });
        } else {
            _logger2.default.debug('User with username ' + data.username + ' does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};

var checkEmail = exports.checkEmail = function checkEmail(req, res) {
    req.check('email', 'Invalid email').isString().isLength({ min: 4, max: 255 }).isEmail();

    var errors = req.validationErrors();
    if (errors) {
        _logger2.default.debug('Validation didn\'t succeed');
        return res.boom.badRequest(_messages2.default['m400.2'], errors);
    }

    var data = {
        email: (0, _xss2.default)(req.params.email)
    };

    var findQuery = {
        'email': { $eq: data.email }
    };

    var what = {
        _id: 1
    };

    _users2.default.findOne(findQuery, what, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _logger2.default.debug('User with email ' + data.email + ' exist');
            return res.status(200).json({
                'message': _messages2.default['m201.1'],
                'data': true
            });
        } else {
            _logger2.default.debug('User with email ' + data.email + ' does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};
//# sourceMappingURL=auth.js.map