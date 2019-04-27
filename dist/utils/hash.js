'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateToken = exports.comparePassword = exports.generatePasswordHash = exports.generateHash = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateHash = exports.generateHash = function generateHash() {
    var length = _config2.default.HASH_LENGTH;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }return text;
};

var generatePasswordHash = exports.generatePasswordHash = function generatePasswordHash(password) {
    var deferred = _q2.default.defer();

    _bcrypt2.default.hash(password, 10, function (err, hash) {
        if (err) {
            deferred.reject('m500.0');
        } else if (hash) {
            deferred.resolve(hash);
        }
    });

    return deferred.promise;
};

var comparePassword = exports.comparePassword = function comparePassword(old_pass, new_pass) {
    var deferred = _q2.default.defer();
    _bcrypt2.default.compare(new_pass, old_pass, function (err, hash) {
        if (err) {
            deferred.reject('m500.0');
        } else if (hash) {
            deferred.resolve(hash);
        }
        deferred.reject('m401.0');
    });

    return deferred.promise;
};

var generateToken = exports.generateToken = function generateToken(name, username, hash, avatar, id) {
    var token = _jsonwebtoken2.default.sign({
        name: name,
        username: username,
        hash: hash,
        avatar: avatar,
        obj_id: id
    }, _config2.default.JWT_TOKEN, { expiresIn: '3d' });

    return token;
};
//# sourceMappingURL=hash.js.map