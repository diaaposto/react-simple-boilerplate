import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

function generateRandomString() {
  return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.addMessage = this.addMessage

    this.state = {
      currentUser: 
      { name: 'Bob' },

      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
  }

  addMessage = (msg) => {
    const newID = generateRandomString();
    const username = this.state.currentUser.name;
    const messageContent = msg;

    const messageObj = {
      id: newID,
      username: username,
      content: messageContent,
    }
    
    const messages = this.state.messages.concat(messageObj);
    this.setState({messages: messages})

 
  }

  //create a function that will grab the content from the input box and update the state for messages
  //create a new message object - with id, username, and update the state to add to this array of messages


  componentDidMount() {

    this.socket.onopen = event => {
      console.log('Connected to server');
    }
    // console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    
    return (
      <div>
      <MessageList messageList={this.state.messages} />
      <Chatbar currentUser={this.state.currentUser.name} addMessage={this.addMessage} />
      </div>
    );
  }
}

export default App;
