'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('../../middlewares');

var _interactions = require('../../controller/interactions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.put('/follow/:username', _middlewares.checkAuth, _interactions.follow);

router.put('/unfollow/:username', _middlewares.checkAuth, _interactions.unfollow);

router.put('/block/:username', _middlewares.checkAuth, _interactions.block);

router.put('/unblock/:username', _middlewares.checkAuth, _interactions.unblock);

exports.default = router;
//# sourceMappingURL=interactions.js.map