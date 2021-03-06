import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser:  { name: 'Guest' },
      messages: [],
      connectedUsers: 0,
      colour: "#000000"
    };
  }

  //take out messageContent variable and either name everything messagecontent or msg

  addMessage = (msg) => {
    const username = this.state.currentUser.name;
    const messageContent = msg;
    console.log(messageContent)

    const messageObj = {
      type: 'postMessage',
      colour: this.state.colour,
      username: username,
      content: messageContent,
    }
    
    this.socket.send(JSON.stringify(messageObj));
  }

//changeName is the function, changeUser is the key of the props obj given to the child component chatbar
  changeName = (newName) => {
    this.setState({currentUser: { name: newName }});
    const oldUsername = this.state.currentUser.name
    const newUsername = newName
    // console.log("this is newName", newName)
    const displayNotification = {
      type: 'postNotification',
      content: `${oldUsername} has changed their username to ${newUsername}.`
    }
    this.socket.send(JSON.stringify(displayNotification));
  }

  //create a function that will grab the content from the input box and update the state for messages
  //create a new message object - with id, username, and update the state to add to this array of messages

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = event => {
      console.log('Connected to server');
    }

    this.socket.onmessage = event => {
      // console.log("this is event?", event);
      const data = JSON.parse(event.data);
      // console.log("this is data outside switch", data.type)
      switch(data.type) {
        case "incomingMessage":
        //handle incoming message // console.log("this is data", data)
        this.setState({messages: [...this.state.messages, data] })
        break;

        case "incomingNotification":
        //handle incoming notification
        this.setState({messages: [...this.state.messages, data] })
        break;

        case "userColour":
        this.setState({colour: data.colour})        
        break;

        case "usersOnline":
        this.setState({connectedUsers: data.users})
        // console.log("this is connectedusers", this.state.connectedUsers)
        break;

        default:
        //show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
      }
    }

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
//use css to display conncted users on the right etc
  render() {
    
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p>{this.state.connectedUsers} users online.</p>
        </nav>
        <MessageList messageList={this.state.messages} />
        <Chatbar changeUser={this.changeName} currentUser={this.state.currentUser.name} addMessage={this.addMessage} />
      </div>
    );
  }
}

export default App;
