'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('../../middlewares');

var _settings = require('../../controller/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.put('/change/password', _middlewares.checkAuth, _settings.updatePassword);

exports.default = router;
//# sourceMappingURL=settings.js.map