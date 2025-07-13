const Notification = ({ notification }) => {
  if (!notification) return null
  switch (notification.type) {
    case 'success':
      return <div className="message">{notification.msg}</div>
    case 'error':
      return (
        <div className="error_message" data-testid="errormsg_div">
          {notification.msg}
        </div>
      )
    default:
      return null
  }
}

export default Notification
