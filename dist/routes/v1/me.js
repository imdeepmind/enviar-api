'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('../../middlewares');

var _me = require('../../controller/me');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _middlewares.checkAuth, _me.getMe);

router.put('/', _middlewares.checkAuth, _me.updateMe);

router.delete('/', _middlewares.checkAuth, _me.deleteMe);

router.put('/dp', _middlewares.checkAuth, _middlewares.upload.single('avatar'), _middlewares.resizeImage, _me.updateDp);

exports.default = router;
//# sourceMappingURL=me.js.map