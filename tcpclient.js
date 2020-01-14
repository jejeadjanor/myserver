const net = require('net');
const client = new net.Socket();
const port = 8080;
const host = '127.0.0.1';

client.connect(port, host, () => {
    console.log('TCP connection established with the server.');
    client.write("Hello From Client " + client.address().address);
});

client.on('data', function(data) {
    console.log('Server Says : ' + data);
});

client.on('close', function() {
    console.log('Connection closed');
});


// //Send a connection request to the server
// client.connect({port:port, host:host}, function(){
//     //If there is no error, the server has accepted and created a new socket dedicated to us.
//     console.log('TCP connection established with the server.');

//     //The client can now send data to the server by writing to its socket.
//     client.write('Hello, server.');
// });

// //The client can also receive data from the server by reading from its socket.
// client.on('data', function(data) {
//     console.log(`Data received from the server: ${data.toString()}.`);
//     client.end();
//  });

//  client.on('end', function() { 
//     console.log('disconnected from server');
//  });