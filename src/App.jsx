import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

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
  
  render() {
    
    return (
      <div>
      <MessageList messageList={this.state.messages} />
      <Chatbar currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;
