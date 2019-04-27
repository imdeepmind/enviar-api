'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateDp = exports.deleteMe = exports.updateMe = exports.getMe = undefined;

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMe = exports.getMe = function getMe(req, res) {
    var findQuery = {
        'username': { $eq: (0, _xss2.default)(req.authData.username) }
    };

    var selectedField = {
        username: 1, name: 1, email: 1, city: 1, state: 1, country: 1,
        gender: 1, dob: 1, avatar: 1, status: 1, bio: 1,
        createdAt: 1, updatedAt: 1, isActive: 1, followee: 1, followers: 1
    };

    _users2.default.findOne(findQuery, selectedField, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _logger2.default.debug('Returned with user ' + doc.username);
            return res.status(200).json(doc);
        } else {
            _logger2.default.debug('User with ' + req.authData.username + ' does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};

var updateMe = exports.updateMe = function updateMe(req, res) {
    req.check('email', 'Invalid email').isString().isLength({ min: 4, max: 255 }).isEmail().optional();
    req.check('name', 'Invalid name').isString().isLength({ min: 4, max: 255 }).optional();
    req.check('gender', 'Invalid gender').isString().isIn(['m', 'f', 'o']).optional();
    req.check('dob', 'Invalid date of birth').isString().isBefore().optional().custom(function (date) {
        return date.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
    });
    req.check('country', 'Invalid country').isString().isLength({ min: 4, max: 255 }).isAlphanumeric().optional();
    req.check('city', 'Invalid city').isString().isLength({ min: 4, max: 255 }).isAlphanumeric().optional();
    req.check('state', 'Invalid state').isString().isLength({ min: 4, max: 255 }).isAlphanumeric().optional();
    req.check('status', 'Invalid status').isString().isLength({ min: 4, max: 255 }).isAlphanumeric().optional();
    req.check('bio', 'Invalid bio').isString().isLength({ min: 24, max: 1024 }).isAlphanumeric().optional();

    var errors = req.validationErrors();
    if (errors) {
        _logger2.default.debug('Validation didn\'t succeed');
        return res.boom.badRequest(_messages2.default['m400.2'], errors);
    }

    var findQuery = {
        username: { $eq: (0, _xss2.default)(req.authData.username) }
    };

    var update = {};

    if (req.body.name) update['name'] = (0, _xss2.default)(req.body.name);
    if (req.body.email) update['email'] = (0, _xss2.default)(req.body.email);
    if (req.body.city) update['city'] = (0, _xss2.default)(req.body.city);
    if (req.body.state) update['state'] = (0, _xss2.default)(req.body.state);
    if (req.body.country) update['country'] = (0, _xss2.default)(req.body.country);
    if (req.body.gender) update['gender'] = (0, _xss2.default)(req.body.gender);
    if (req.body.dob) update['dob'] = (0, _xss2.default)(req.body.dob);
    if (req.body.status) update['status'] = (0, _xss2.default)(req.body.status);
    if (req.body.bio) update['bio'] = (0, _xss2.default)(req.body.bio);

    update['updatedAt'] = Date();
    update['isActive'] = true;

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
};

var deleteMe = exports.deleteMe = function deleteMe(req, res) {
    var findQuery = {
        username: { $eq: (0, _xss2.default)(req.authData.username) }
    };

    _users2.default.findOneAndRemove(findQuery, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _logger2.default.debug('Deleted user with username ' + req.authData.username);
            return res.status(200).json({
                username: req.authData.username
            });
        } else {
            _logger2.default.debug('User with ' + req.authData.username + ' does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};

var updateDp = exports.updateDp = function updateDp(req, res) {
    var findQuery = {
        username: (0, _xss2.default)(req.authData.username)
    };

    var update = {
        avatar: req.file.filename
    };

    _users2.default.findOneAndUpdate(findQuery, update, function (err, doc) {
        if (err) {
            _logger2.default.error('Database error: ', err);
            return res.boom.badImplementation(_messages2.default['m500.0']);
        } else if (doc) {
            _logger2.default.debug('Updated avatar of user with ' + doc.username + ' username');
            return res.status(200).json({
                avatar: req.file.filename + '.jpg'
            });
        } else {
            _logger2.default.debug('User with ' + req.authData.username + ' does not exist');
            return res.boom.notFound(_messages2.default['m404.0']);
        }
    });
};
//# sourceMappingURL=me.js.map