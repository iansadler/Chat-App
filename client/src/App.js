import React from 'react'
import ChatInput from './components/chatInput'
import ChatMessage from './components/chatMessage'
import FriendCard from './components/friendCard'

const url = 'http://localhost:5000/api/conversations/0'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      conversations: [],
      openedConversation: null
    }
  }

  componentDidMount () {
    fetch(url, {
      method: 'GET',
      mode: 'cors',
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
    console.log(`clicked friend ${c.name}`)
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
    console.log(this.state.conversations)
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
            {this.renderOpenedConversation()}
            <ChatInput sendMessage={this.sendMessage} />
          </div>
        </div>
      </div>
    )
  }
}

export default App