// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(
    PORT, '0.0.0.0', 'localhost', 
  () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//Function to select a colour

const setUserColour = () => {
  const colours = ['#ff0000', '#52a002', '#883fe2', '#FF8C00', '#483D8B', '#2E8B57', '#DAA520'];
  return colours[Math.floor(Math.random() * colours.length)];
}

//Online Users

const getOnlineUsers = () => {
  let usersOnline = {
    type: 'usersOnline',
    users: wss.clients.size
  }
wss.broadcast(usersOnline);
}

//ws param contains the object of the person that just connected to your socket
wss.on('connection', (client) => {
  console.log('Client connected');

  getOnlineUsers();

  const colourAssign = {
    type: 'userColour',
    colour: setUserColour()
  };
  client.send(JSON.stringify(colourAssign))

  //Echo back messages (testing purposes)
  client.on('message', function incoming(data) {
    broadcastBack(data);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected')

    const onlineUsers = {
      type: 'usersOnline',
      users: wss.clients.size
    }
  
    wss.broadcast(onlineUsers)
  });

});

//broadcast - goes through each client and sends message data
//clients contains an array of everyone who is connected to the socket @ that moment
wss.broadcast = (data) => {
  wss.clients.forEach(client =>  {
    client.send(JSON.stringify(data));
  });
}

const broadcastBack = (messageStringified) => {
  const msg = JSON.parse(messageStringified);
  msg.id = uuidv4();

  switch(msg.type) {
    case 'postMessage':
    msg.type = 'incomingMessage'
    break;
    case 'postNotification':
    msg.type = 'incomingNotification'
    break;
    default:
    throw new Error('Unknown event type ' + msg.type )
  }

    // console.log(`Received: ${JSON.stringify(msg)}`)
  wss.broadcast(msg);
}