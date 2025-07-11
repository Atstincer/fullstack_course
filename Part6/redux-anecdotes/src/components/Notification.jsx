import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    //console.log('state', state)
    return state.notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification === undefined || notification === '') return null
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification