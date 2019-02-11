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
      lang: PropTypes.string,
    }
    static defaultProps = {
      lang: null,
    }
    static contextTypes = {
      translator: PropTypes.object,
      lang: PropTypes.string,
    }
    static childContextTypes = {
      translator: PropTypes.object,
      // lang: PropTypes.string,
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
        const ctx = {
          translator: this.translator,
        }
        // if (this.props.lang != null) {
        //   ctx.lang = this.props.lang
        // }
        return ctx
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
      const lang = this.props.lang || this.context.lang
      if (lang) {
        this.translator.locale(lang)
      }
      return (
        <Target {...others} translator={this.translator}>
          {children}
        </Target>
      )
    }
  }
)

export default withTranslator
