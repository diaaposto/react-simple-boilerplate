import React, {Component} from 'react';

class Chatbar extends Component {

  render() {
    return (
      <footer className='chatbar'>
        <input className="chatbar-username" defaultValue={this.props.currentUser} />
        {/* <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.messageHandler} /> */}
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }

  handleKeyPress = ev => {
    if (ev.key === 'Enter') {
      this.props.addMessage(ev.target.value);
      // console.log(messageObj)
      ev.target.value = "";
    }
  }
}

export default Chatbar;