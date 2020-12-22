import React from 'react'
import ChatInput from '../components/chatInput'
import ChatMessage from '../components/chatMessage'
import FriendCard from '../components/friendCard'
import { Redirect } from "react-router-dom"

// const url = 'http://localhost:5000/api/conversations/0'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations: [],
      openedConversation: null
    }
  }

  componentDidMount () {
    fetch("http://localhost:5000/auth/success", {
      method: "GET",
      mode: 'cors',
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        console.log(response.status)
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        console.log("hello world")
        this.setState({
          authenticated: true,
          user: responseJson.user
        })
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        })
      })

    // fetch(url, {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res =>  res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         conversations: result
    //       })
    //     },
    //     (error) => {
    //       console.log(error)
    //       this.setState({
    //         error
    //       })
    //     }
    //   )
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
          {this.state.openedConversation.name}
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
    console.log(this.state)
    if (this.state.authenticated === false) {
      return <Redirect to={'/login'} />
    }

    return (
      <div className="App" style={{ display: 'flex', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {this.state.conversations.map((c) => (
            <FriendCard
              clickFriendCard={() => this.clickFriendCard(c)}
              key={c.name}
              name={c.name}
            />
          ))}
        </div>
        <div style={{ flex: 1, flexDirection: 'column', position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: '0px' }}>
            <input onClick={openLogoutWindow} type="button" value="Logout"/>
            {this.renderOpenedConversation()}
            <ChatInput sendMessage={this.sendMessage} />
          </div>
        </div>
      </div>
    )
  }
}

function openLogoutWindow () {
  window.open("http://localhost:5000/auth/logout", "_self");
}

export default Home