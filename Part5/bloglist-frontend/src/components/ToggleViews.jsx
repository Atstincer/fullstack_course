import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const ToggleViews = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return toggleVisibility
  })

  return (
    <div>
      <button
        className="btn btn-outline-primary btn-sm"
        style={hideWhenVisible}
        onClick={toggleVisibility}>
        {props.buttonLabel}
      </button>
      <div style={showWhenVisible}>{props.children}</div>
    </div>
  )
})

ToggleViews.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

ToggleViews.displayName = 'ToggleViews'

export default ToggleViews
