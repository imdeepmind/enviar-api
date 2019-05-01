'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('../../middlewares');

var _resource = require('../../controller/resource');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:type/:file/:resolution', _resource.getImage);

exports.default = router;
//# sourceMappingURL=resource.js.map