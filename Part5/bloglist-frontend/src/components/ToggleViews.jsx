import { useState, forwardRef, useImperativeHandle } from 'react'

const ToggleViews = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none'}
  const hideWhenVisible = { display: visible ? 'none' : ''}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return (
      toggleVisibility
    )
  })

  return (
    <div>
      <button style={ hideWhenVisible } onClick={ toggleVisibility }>{props.buttonLabel}</button>
      <div style={ showWhenVisible }>
        {props.children}
        <button onClick={ toggleVisibility }>cancel</button>
      </div>
    </div>
  )
})

export default ToggleViews