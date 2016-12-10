const http = require('http')
const io = require('socket.io')


// The port the server listens on, lib/client.js should match this
const PORT = 8080
const MESSAGE_INTERVAL = 5000

// Start the server at port 8080
var server = http.createServer()

server.listen(PORT)

// Create a Socket.IO instance, passing it our server
var socket = io.listen(server)

// When a client connects we setup some event listeners
socket.on('connection', (client) => {

    // Message the client every interval
    var interval = setInterval(()  => {

        client.emit('hello', { utc: new Date().getTime() })

        console.log(`Client ${client.id} | Hello!`)

    }, MESSAGE_INTERVAL)

	client.on('disconnect', () => {
        // Make sure we clear down any periodic message handles
		clearInterval(interval)

		console.log(`Client ${client.id} | Disconnected`)
	});

    console.log(`Client ${client.id} | Connected`)
})
