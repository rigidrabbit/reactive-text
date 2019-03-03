// MIT license (see LICENSE)
// Copyright 2019 @rigidrabbit
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import createTranslator from './createTranslator'

// const nop = createTranslator()

const withTranslator = dictionary => Target => (
  class WithTranslator extends Component {
    static displayName = `WithTranslator(${Target.displayName || Target.name || 'Component'})`
    static propTypes = {
      locale: PropTypes.string,
    }
    static defaultProps = {
      locale: '',
    }
    static contextTypes = {
      translator: PropTypes.object,
      locale: PropTypes.string,
    }
    static childContextTypes = {
      translator: PropTypes.object,
      locale: PropTypes.string,
    }

    ensureTranslator() {
      if (this.translator) {
        return
      }
      const translator = this.context.translator
      if (dictionary != null && Object.keys(dictionary).length) {
        this.hasOwnTranslator = true
        this.translator = translator.derive(dictionary)
      } else {
        this.hasOwnTranslator = false
        this.translator = translator
      }
    }

    getChildContext() {
      this.ensureTranslator()
      if (this.hasOwnTranslator) {
        return {
          translator: this.translator,
          locale: this.props.locale || this.context.locale,
        }
      }
      return {}
    }

    componentWillMount() {
      this.ensureTranslator()
    }

    componentWillUnmount() {
      this.hasOwnTranslator = false
      this.translator = null
    }

    render() {
      const { children, ...others } = this.props
      this.translator.locale(this.props.locale || this.context.locale)
      return (
        <Target {...others} translator={this.translator}>
          {children}
        </Target>
      )
    }
  }
)

export default withTranslator
