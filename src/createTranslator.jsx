// MIT license (see LICENSE)
// Copyright 2019 @rigidrabbit
import moment from 'moment'
import sprintfjs from 'localized-sprintf-js'

export default function createTranslator(dictinary, options, parent) {
  const dic = dictinary || {}
  let localized = null
  let sprintf
  let vsprintf
  if (parent) {
    sprintf = parent.sprintf
    vsprintf = parent.vsprintf
  } else {
    options = options || {}
    localized = sprintfjs.localized({ ...options, moment })
    sprintf = localized.sprintf
    vsprintf = localized.vsprintf
  }

  function getLocale() {
    if (parent) {
      return parent.locale
    }
    return localized.locale()
  }

  function setLocale(loc) {
    if (parent) {
      parent.locale(loc)
      return
    }
    localized.locale(loc)
  }

  function getCurrency() {
    if (parent) {
      return parent.currency
    }
    return localized.currency()
  }

  function setCurrency(loc) {
    if (parent) {
      parent.currency(loc)
      return
    }
    localized.currency(loc)
  }

  function getMoment() {
    return moment
  }

  function lookUp(word) {
    const entry = dic[word]
    if (entry) {
      let w = entry[getLocale()]
      if (typeof w === 'string') {
        return w
      }
      w = entry['*']
      if (typeof w === 'string') {
        return w
      }
    }
    if (parent) {
      return parent.lookUp(word)
    }
    return word
  }

  function t(texts, ...params) {
    if (typeof texts === 'string') {
      return lookUp(texts)
    }
    if (texts.length === 1 && params.length === 0) {
      return lookUp(texts[0])
    }
    // console.error('params is not empty!', texts, params, raws)
    const arr = []
    const tlen = texts.length
    const plen = params.length
    const ln = tlen > plen ? tlen : plen
    for (let i = 0; i < ln; i++) {
      if (i < tlen) {
        arr.push(texts[i])
      }
      if (i < plen) {
        arr.push(params[i])
      }
    }
    return lookUp(arr.join(''))
  }

  function f(texts, ...params) {
    if (typeof texts === 'string') {
      return vsprintf(lookUp(texts), ...params)
    }
    if (Array.isArray(texts) && texts.raw == null && texts.length && typeof texts[0] === 'string') {
      return vsprintf(lookUp(texts[0]), texts.slice(1))
    }
    return function tf(...args) {
      const fmt = t(texts, ...params)
      return vsprintf(fmt, args)
    }
  }

  /* eslint-disable no-underscore-dangle */
  function _t(texts, ...params) {
    if (texts && Array.isArray(texts.raw)) {
      return t(texts.raw, ...params)
    }
    return t(texts, ...params)
  }

  function _f(texts, ...params) {
    if (texts && Array.isArray(texts.raw)) {
      texts.raw.raw = []
      return f(texts.raw, ...params)
    }
    return f(texts, ...params)
  }

  /* eslint-enable no-underscore-dangle */

  const translator = {
    t,
    f,
    _t,
    _f,
    sprintf,
    vsprintf,
    lookUp,
    locale(v) {
      if (arguments.length === 0 || (arguments.length === 1 && v === void 0)) {
        return getLocale()
      }
      setLocale(v)
      return getLocale()
    },
    currency(v) {
      if (arguments.length === 0 || (arguments.length === 1 && v === void 0)) {
        return getCurrency()
      }
      setCurrency(v)
      return getCurrency()
    },
    moment() {
      return getMoment()
    },
    derive(dict) {
      return createTranslator(dict, null, translator)
    },
  }

  return translator
}
