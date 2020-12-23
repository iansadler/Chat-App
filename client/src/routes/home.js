import React from 'react'
import ChatInput from '../components/chatInput'
import ChatMessage from '../components/chatMessage'
import FriendCard from '../components/friendCard'
import { Redirect } from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations: [],
      openedConversation: null,
      user: {
        displayName: ''
      }
    }
  }

  componentDidMount () {
    fetch('http://localhost:5000/auth/success', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json()
        throw new Error('failed to authenticate user')
      })
      .then(responseJson => {
        this.getUsers()
        this.setState({
          authenticated: true,
          user: responseJson.user
        })
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: 'Failed to authenticate user'
        })
      })
  }

  // We just display all users on the chat side bar.
  // We have no concept of friends / a user search right now.
  getUsers () {
    fetch('http://localhost:5000/api/users', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>  res.json())
    .then(
      (result) => {
        this.setState({
          conversations: result
        })
      },
      (error) => {
        console.log(error)
        this.setState({
          error
        })
      }
    )
  }

  sendMessage = (message) => {
    console.log(`sent message ${message}`)
  }

  clickFriendCard = (c) => {
    this.setState({ openedConversation: c })
  }

  renderOpenedConversation = () => {
    if (this.state.openedConversation !== null) {
      if (this.state.openedConversation.messages !== undefined) {
        return (
          <div>
            {this.state.openedConversation.messages.map((m) => (
              <ChatMessage message={m.message} />
            ))}
          </div>
        )
      }
      return (
        <p>
          You have no message history with
          {' '}
          {this.state.openedConversation.username}
        </p>
      )
    }
    return (
      <p>
        Click a user to start chatting!
      </p>
    )
  }

  render() {
    if (this.state.authenticated === false) {
      return <Redirect to={'/login'} />
    }

    return (
      <div className='App' style={{ display: 'flex', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {this.state.conversations.map((c) => (
            <FriendCard
              clickFriendCard={() => this.clickFriendCard(c)}
              key={c.user_id}
              name={c.username}
            />
          ))}
        </div>
        <div style={{ flex: 1, flexDirection: 'column', position: 'relative' }}>
          <p>Currently logged in as {this.state.user.displayName}</p>
          <input onClick={openLogoutWindow} type='button' value='Logout'/>
          <div style={{ position: 'absolute', bottom: '0px' }}>

            {this.renderOpenedConversation()}
            <ChatInput sendMessage={this.sendMessage} />
          </div>
        </div>
      </div>
    )
  }
}

function openLogoutWindow () {
  window.open('http://localhost:5000/auth/logout', '_self')
}

export default Home