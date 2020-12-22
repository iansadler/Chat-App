import React from 'react'
import PropTypes from 'prop-types'

function ChatMessage(props) {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  )
}

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired
}

// ChatMessage.defaultProps = {
//   name: ''
// }

export default ChatMessage
