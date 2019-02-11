'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // MIT license (see LICENSE)
// Copyright 2019 @rigidrabbit


// import createTranslator from './createTranslator'

// const nop = createTranslator()

var withTranslator = function withTranslator(dictionary) {
  return function (Target) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
      _inherits(WithTranslator, _Component);

      function WithTranslator() {
        _classCallCheck(this, WithTranslator);

        return _possibleConstructorReturn(this, (WithTranslator.__proto__ || Object.getPrototypeOf(WithTranslator)).apply(this, arguments));
      }

      _createClass(WithTranslator, [{
        key: 'ensureTranslator',
        value: function ensureTranslator() {
          if (this.translator) {
            return;
          }
          var translator = this.context.translator;
          if (dictionary != null && Object.keys(dictionary).length) {
            this.hasOwnTranslator = true;
            this.translator = translator.derive(dictionary);
          } else {
            this.hasOwnTranslator = false;
            this.translator = translator;
          }
        }
      }, {
        key: 'getChildContext',
        value: function getChildContext() {
          this.ensureTranslator();
          if (this.hasOwnTranslator) {
            var ctx = {
              translator: this.translator
              // if (this.props.lang != null) {
              //   ctx.lang = this.props.lang
              // }
            };return ctx;
          }
          return {};
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.ensureTranslator();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.hasOwnTranslator = false;
          this.translator = null;
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props,
              children = _props.children,
              others = _objectWithoutProperties(_props, ['children']);

          var lang = this.props.lang || this.context.lang;
          if (lang) {
            this.translator.locale(lang);
          }
          return _react2.default.createElement(
            Target,
            _extends({}, others, { translator: this.translator }),
            children
          );
        }
      }]);

      return WithTranslator;
    }(_react.Component), _class.displayName = 'WithTranslator(' + (Target.displayName || Target.name || 'Component') + ')', _class.propTypes = {
      lang: _propTypes2.default.string
    }, _class.defaultProps = {
      lang: null
    }, _class.contextTypes = {
      translator: _propTypes2.default.object,
      lang: _propTypes2.default.string
    }, _class.childContextTypes = {
      translator: _propTypes2.default.object
      // lang: PropTypes.string,
    }, _temp;
  };
};

exports.default = withTranslator;
//# sourceMappingURL=withTranslator.js.map
