import React, {Component} from 'react';

class Chatbar extends Component {

  render() {
    return (
      <footer className='chatbar'>
        <input className="chatbar-username" defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.messageHandler} />
      </footer>
    );
  }
}

export default Chatbar;