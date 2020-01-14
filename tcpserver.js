
const net = require('net');
const port = 8080;
const host = '127.0.0.1';


//create a new TCP server
const server = net.createServer();
server.listen(port, host, () => {
    console.log(`Server listening for connection requests on socket ${host}:${port}.`);
});

//When a client requests a connection with the server, the server creates a new socket dedicated to that client.
//Think of a socket as an endpoint
let sockets = [];

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function(sock, index, array) {
            sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        })
    });

     // Add a 'close' event handler to this instance of socket
     sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
})
