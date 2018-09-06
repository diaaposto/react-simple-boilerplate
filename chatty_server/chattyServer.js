// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
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

//Online Users

const onlineUsersFunc = () => {
  let usersOnline = {
    type: 'usersOnline',
    users: wss.clients.size
  }
wss.broadcast(usersOnline);
}
// let userData

//ws param contains the object of the person that just connected to your socket
wss.on('connection', (client) => {
  console.log('Client connected');
  onlineUsersFunc();
  //Echo back messages (testing purposes)
  client.on('message', function incoming(data) {
    broadcastBack(data);
  });
//   console.log('what is this', broadcastBack(message))

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});

//broadcast - goes through each client and sends message data
//clients contains an array of everyone who is connected to the socket @ that moment
wss.broadcast = function(data) {
  wss.clients.forEach(client =>  {
    if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(data));
    }
  });
}

function broadcastBack(messageStringified) {
  const msg = JSON.parse(messageStringified);
  // console.log('this is msg', msg);
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