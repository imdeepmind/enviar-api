'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = function connect() {
    _mongoose2.default.connect(_config2.default.MONGODB, { useNewUrlParser: true }, function (err) {
        if (err) {
            _logger2.default.error('Can not connected to the database at ' + _config2.default.MONGODB);
            return false;
        }
        _logger2.default.info('Connected to mongodb database at ' + _config2.default.MONGODB);
    });
    return true;
};

exports.default = connect;
//# sourceMappingURL=db.js.map