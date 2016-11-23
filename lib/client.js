const io = require('socket.io-client')



const HOSTNAME = 'localhost'
const PORT = 8080
let CLIENT_ID = 0


// Setup the socket
const socket = new io(`http://${HOSTNAME}:${PORT}`)

// Add a connect listener
socket.on('connect', function() {

    CLIENT_ID = socket.id
	console.log(`Client ${CLIENT_ID} | Connected to the server`);
});

socket.on('disconnect', function() {

	console.log(`Client ${CLIENT_ID} | Disconnected to the server`);
});

socket.on('hello', function(data) {

    console.log(`Client ${CLIENT_ID} | Hello from server (Server UTC: ${data.utc})`);
});

socket.on('ping', () => {

    console.log(`Client ${CLIENT_ID} | Pinged server`)
})

socket.on('pong', (latency) => {

    console.log(`Client ${CLIENT_ID} | Server ponged (${latency}ms)`)
});

socket.connect();
