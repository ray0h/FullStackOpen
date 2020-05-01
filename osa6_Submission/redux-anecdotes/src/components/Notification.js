import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification.content
  const showNot = props.notification.show

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: showNot ? '' : 'none'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    show: state.show,
  }
}

export default connect(mapStateToProps)(Notification)