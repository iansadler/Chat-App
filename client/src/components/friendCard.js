import React from 'react'
import PropTypes from 'prop-types'

class FriendCard extends React.Component {
  onClick = () => {
    this.props.clickFriendCard()
    // In future can change the FriendCard styling and state to show it is selected
  }

  render() {
    return (
      <button onClick={this.onClick} style={{ width: '240px' }} type="button">
        <h4>{this.props.name}</h4>
      </button>
    )
  }
}

FriendCard.propTypes = {
  name: PropTypes.string,
  clickFriendCard: PropTypes.func.isRequired
}

FriendCard.defaultProps = {
  name: ''
}

export default FriendCard
