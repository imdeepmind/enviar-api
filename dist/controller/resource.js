'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getImage = undefined;

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getImage = exports.getImage = function getImage(req, res) {
    var type = (0, _xss2.default)(req.params.type);
    var file = (0, _xss2.default)(req.params.file);
    var resolution = (0, _xss2.default)(req.params.resolution);

    var path1 = '';
    if (type === 'post') path1 = 'posts';else if (type === 'profile') path1 = 'images';

    var path2 = '';
    if (resolution === 'original') path2 = 'raw';else if (resolution === 'medium') {
        if (type === 'profile') path2 = 'r200x200';else if (type === 'post') path2 = 'r500x500';
    } else if (resolution === 'small' && type == 'profile') path2 = 'r48x48';

    if (path1 != '' && path2 != '') {
        var myPath = path2 + '/' + file;
        _logger2.default.debug('Sending the file with following path ' + myPath);
        return res.sendFile(myPath, { root: path1 + '/' });
    } else {
        _logger2.default.debug('Resource does not exists');
        return res.boom.notFound(_messages2.default['m404.3']);
    }
};
//# sourceMappingURL=resource.js.map