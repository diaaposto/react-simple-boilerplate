// server.js

const express = require('express');
const SocketServer = require('ws').Server;
// const WebSocket = require('ws');
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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

//ws param contains the object of the person that just connected to your socket
wss.on('connection', (client) => {
  console.log('Client connected');

  //Echo back messages (testing purposes)
  client.on('message', broadcastBack);
//   console.log('what is this', broadcastBack(message))

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});

//broadcast - goes through each client and sends message data
//clients contains an array of everyone who is connected to the socket @ that moment
wss.broadcast = function(data) {
    wss.clients.forEach(client =>  {
        client.send(data);
    });
}

function broadcastBack(messageStringified) {
    const msg = JSON.parse(messageStringified);
    msg.id = uuidv4();
    
    console.log(`Received: ${JSON.stringify(msg)}`)
    wss.broadcast(JSON.stringify(msg));
}