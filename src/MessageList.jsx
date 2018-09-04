import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const allMessages = this.props.messageList.map((message) => 
    <Message key={ message.id } username={ message.username } content={ message.content } />
  );

    return (
      <main className="messages">
      {allMessages}
       <div className="message system"></div>
       </main>
    );
  }
}

export default MessageList;