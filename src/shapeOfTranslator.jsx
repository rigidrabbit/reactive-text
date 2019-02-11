// MIT license (see LICENSE)
// Copyright 2019 @rigidrabbit
import PropTypes from 'prop-types'

const shapeOfTranslator = PropTypes.shape({
  t: PropTypes.func,
  f: PropTypes.func,
  _t: PropTypes.func,
  _f: PropTypes.func,
  sprintf: PropTypes.func,
  vsprintf: PropTypes.func,
  lookUp: PropTypes.func,
  locale: PropTypes.func,
  currency: PropTypes.func,
  moment: PropTypes.func,
  derive: PropTypes.func,
})
export default shapeOfTranslator
