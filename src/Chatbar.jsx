import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Chatbar extends Component {

handleKeyPress = ev => {
  if (ev.key === 'Enter') {
    this.props.addMessage(ev.target.value);
    // console.log(messageObj)
    ev.target.value = "";
  }
}

handleName = ev => {
  if (ev.key === 'Enter') {
    this.props.changeUser(ev.target.value); //changeUser is the name of the prop key sent from App
  }
}
// to trace it - onKeyPress is the eventhandler that takes a callback function this.handleKeyPress
// calls the props, and then trace it to app.jsx, look at the render - check the key name, that will point to the function name wtv it needs to point to
render() {
  return (
    <footer className='chatbar'>
      <input 
      className="chatbar-username" 
      defaultValue={this.props.currentUser} 
      onKeyPress={this.handleName}
      />
      <input 
      className="chatbar-message" 
      placeholder="Type a message and hit ENTER" 
      onKeyPress={this.handleKeyPress} 
      />
    </footer>
  );
}
}
Chatbar.propTypes = {
  currentUser: PropTypes.string,
  changeUser: PropTypes.func,
  addMessage: PropTypes.func
}

export default Chatbar;