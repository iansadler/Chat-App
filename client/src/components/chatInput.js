import React from 'react'
import PropTypes from 'prop-types'

class ChatInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.sendMessage(this.state.value)
      this.clearInput()
    }
  }

  clearInput() {
    this.setState({ value: '' })
  }

  render() {
    return (
      <input
        style={{ width: '240px' }}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}

ChatInput.propTypes = {
  sendMessage: PropTypes.func.isRequired
}

// ChatInput.defaultProps = {
//   name: ''
// }

export default ChatInput
