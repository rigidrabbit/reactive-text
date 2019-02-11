// MIT license (see LICENSE)
// Copyright 2019 @rigidrabbit
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import shapeOfTranslator from './shapeOfTranslator'

export default class TranslatorProvider extends Component {
  static propTypes = {
    translator: shapeOfTranslator.isRequired,
    lang: PropTypes.string,
  }
  static defaultProps = {
    translator: null,
    lang: null,
  }
  static childContextTypes = {
    translator: PropTypes.object,
    lang: PropTypes.string,
  }

  getChildContext() {
    this.props.translator.lang = this.props.lang
    return {
      translator: this.props.translator,
      lang: this.props.lang,
    }
  }

  render() {
    this.props.translator.lang = this.props.lang
    const children = this.props.children
    if (React.Children.count(children) === 1) {
      return React.Children.only(children)
    }
    return <div>{children}</div>
  }
}
