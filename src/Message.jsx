import React, {Component} from 'react';
import PropTypes from 'prop-types';
//change notification for names make a distinction if its a notification or a message

class Message extends Component {
 
  render() {
    const {username, content, colour} = this.props
    const regExForImages = /https?:\/\/(~?\w+(-?\w*)+(\/|\.))+(png|jpg|gif)/gi;
    const image = content.match(regExForImages);

    if (image) {
      content.replace(image[0],`<img src='${image[0]}' />`) ;
      
      return (
        <div className="message">
          <span className="message-username" style={ { color: colour } }>{username}</span>
          <span className="message-content"><img src={image[0]} width="300" alt="image" /></span>
        </div>
      );
      
      } else {
        return (
        <div className="message">
          <span className="message-username" style={ { color: colour } }>{username}</span>
          <span className="message-content">{content}</span>
        </div>
      );
    }
  } 
}

Message.propTypes = {
  username: PropTypes.string,
  content: PropTypes.string,
  colour: PropTypes.string,
  image: PropTypes.string
}
export default Message;