import React, {Component} from 'react';
import PropTypes from 'prop-types';
//change notification for names make a distinction if its a notification or a message
//transform this into a stateless component

class Message extends Component {
 
  render() {
    const {username, content, colour} = this.props
    return (
    <div className="message">
      <span className="message-username" style={ { color: colour } }>{username}</span>
      <span className="message-content">{content}</span>
    </div>
    );
  }
}

Message.propTypes = {
  username: PropTypes.string,
  content: PropTypes.string,
  colour: PropTypes.string
}
export default Message;