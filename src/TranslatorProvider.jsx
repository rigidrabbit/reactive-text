// MIT license (see LICENSE)
// Copyright 2019 @rigidrabbit
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import shapeOfTranslator from './shapeOfTranslator'

export default class TranslatorProvider extends Component {
  static propTypes = {
    translator: shapeOfTranslator.isRequired,
    locale: PropTypes.string,
  }
  static defaultProps = {
    locale: '',
  }
  static childContextTypes = {
    translator: PropTypes.object,
    locale: PropTypes.string,
  }

  getChildContext() {
    this.props.translator.locale(this.props.locale)
    return {
      translator: this.props.translator,
      locale: this.props.locale,
    }
  }

  render() {
    this.props.translator.locale(this.props.locale)
    const children = this.props.children
    if (React.Children.count(children) === 1) {
      return React.Children.only(children)
    }
    return <div>{children}</div>
  }
}
