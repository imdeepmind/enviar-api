'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logDir = 'log';

if (!_fs2.default.existsSync(logDir)) {
    _fs2.default.mkdirSync(logDir);
}

var filename = _path2.default.join(logDir, 'logging.log');

var logger = (0, _winston.createLogger)({
    levels: _winston2.default.config.syslog.levels,
    format: _winston.format.combine(_winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), _winston.format.printf(function (info) {
        return info.timestamp + ' ' + info.level + ': ' + info.message;
    })),
    transports: [new _winston.transports.Console({
        level: _config2.default.LOG_LEVEL,
        format: _winston.format.combine(_winston.format.colorize(), _winston.format.printf(function (info) {
            return info.timestamp + ' ' + info.level + ': ' + info.message;
        }))
    }), new _winston.transports.File({ filename: filename })]
});

exports.default = logger;
//# sourceMappingURL=logger.js.map