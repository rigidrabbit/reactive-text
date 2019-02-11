'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // MIT license (see LICENSE)
// Copyright 2019 @rigidrabbit


exports.default = createTranslator;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _localizedSprintfJs = require('localized-sprintf-js');

var _localizedSprintfJs2 = _interopRequireDefault(_localizedSprintfJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTranslator(dictinary, options, parent) {
  var dic = dictinary || {};
  var localized = null;
  var sprintf = void 0;
  var vsprintf = void 0;
  if (parent) {
    sprintf = parent.sprintf;
    vsprintf = parent.vsprintf;
  } else {
    options = options || {};
    localized = _localizedSprintfJs2.default.localized(_extends({}, options, { moment: _moment2.default }));
    sprintf = localized.sprintf;
    vsprintf = localized.vsprintf;
  }

  function getLocale() {
    if (parent) {
      return parent.locale;
    }
    return localized.locale();
  }

  function setLocale(loc) {
    if (parent) {
      parent.locale(loc);
      return;
    }
    localized.locale(loc);
  }

  function getCurrency() {
    if (parent) {
      return parent.currency;
    }
    return localized.currency();
  }

  function setCurrency(loc) {
    if (parent) {
      parent.currency(loc);
      return;
    }
    localized.currency(loc);
  }

  function getMoment() {
    return _moment2.default;
  }

  function lookUp(word) {
    var entry = dic[word];
    if (entry) {
      var w = entry[getLocale()];
      if (typeof w === 'string') {
        return w;
      }
      w = entry['*'];
      if (typeof w === 'string') {
        return w;
      }
    }
    if (parent) {
      return parent.lookUp(word);
    }
    return word;
  }

  function t(texts) {
    if (typeof texts === 'string') {
      return lookUp(texts);
    }
    if (texts.length === 1 && (arguments.length <= 1 ? 0 : arguments.length - 1) === 0) {
      return lookUp(texts[0]);
    }
    // console.error('params is not empty!', texts, params, raws)
    var arr = [];
    var tlen = texts.length;
    var plen = arguments.length <= 1 ? 0 : arguments.length - 1;
    var ln = tlen > plen ? tlen : plen;
    for (var i = 0; i < ln; i++) {
      if (i < tlen) {
        arr.push(texts[i]);
      }
      if (i < plen) {
        arr.push(arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      }
    }
    return lookUp(arr.join(''));
  }

  function f(texts) {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (typeof texts === 'string') {
      return vsprintf.apply(undefined, [lookUp(texts)].concat(params));
    }
    if (Array.isArray(texts) && texts.raw == null && texts.length && typeof texts[0] === 'string') {
      return vsprintf(lookUp(texts[0]), texts.slice(1));
    }
    return function tf() {
      var fmt = t.apply(undefined, [texts].concat(params));

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return vsprintf(fmt, args);
    };
  }

  /* eslint-disable no-underscore-dangle */
  function _t(texts) {
    for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      params[_key3 - 1] = arguments[_key3];
    }

    if (texts && Array.isArray(texts.raw)) {
      return t.apply(undefined, [texts.raw].concat(params));
    }
    return t.apply(undefined, [texts].concat(params));
  }

  function _f(texts) {
    for (var _len4 = arguments.length, params = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      params[_key4 - 1] = arguments[_key4];
    }

    if (texts && Array.isArray(texts.raw)) {
      texts.raw.raw = [];
      return f.apply(undefined, [texts.raw].concat(params));
    }
    return f.apply(undefined, [texts].concat(params));
  }

  /* eslint-enable no-underscore-dangle */

  var translator = {
    t: t,
    f: f,
    _t: _t,
    _f: _f,
    sprintf: sprintf,
    vsprintf: vsprintf,
    lookUp: lookUp,
    locale: function locale(v) {
      if (arguments.length === 0 || arguments.length === 1 && v === void 0) {
        return getLocale();
      }
      setLocale(v);
      return getLocale();
    },
    currency: function currency(v) {
      if (arguments.length === 0 || arguments.length === 1 && v === void 0) {
        return getCurrency();
      }
      setCurrency(v);
      return getCurrency();
    },
    moment: function moment() {
      return getMoment();
    },
    derive: function derive(dict) {
      return createTranslator(dict, null, translator);
    }
  };

  return translator;
}
//# sourceMappingURL=createTranslator.js.map
