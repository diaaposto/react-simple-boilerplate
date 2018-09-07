//change to stateless component

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const {messageList} = this.props

    const chattyMessages = messageList.map((message) => 
    <Message key={ message.id } username={ message.username } colour={message.colour} content={ message.content } />
  );
  return (
    <main className="messages">
    {chattyMessages}
    <div className="message system"></div> 
    </main>
    );
  }
}

MessageList.propTypes = {
  messageList: PropTypes.array
};

export default MessageList;

//in message system - this is for notifications
// in map - we have a type in the message key
// you can do an if based on type - if incoming message return component called message
// but if incoming notification return this div with content of messae inside