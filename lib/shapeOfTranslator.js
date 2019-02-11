'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shapeOfTranslator = _propTypes2.default.shape({
  t: _propTypes2.default.func,
  f: _propTypes2.default.func,
  _t: _propTypes2.default.func,
  _f: _propTypes2.default.func,
  sprintf: _propTypes2.default.func,
  vsprintf: _propTypes2.default.func,
  lookUp: _propTypes2.default.func,
  locale: _propTypes2.default.func,
  currency: _propTypes2.default.func,
  moment: _propTypes2.default.func,
  derive: _propTypes2.default.func
}); // MIT license (see LICENSE)
// Copyright 2019 @rigidrabbit
exports.default = shapeOfTranslator;
//# sourceMappingURL=shapeOfTranslator.js.map
