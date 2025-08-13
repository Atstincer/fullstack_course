import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const ToggleViews = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </button>
      <div style={showWhenVisible}>
        {props.children}
        {/*<button onClick={toggleVisibility}>cancel</button>*/}
      </div>
    </div>
  )
})

ToggleViews.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

ToggleViews.displayName = 'ToggleViews'

export default ToggleViews
