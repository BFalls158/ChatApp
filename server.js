const express = require('express')
	, http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/index.html'));
});

io.on('connection', socket => {
	console.log('user connected');
	socket.on('chat message', msg => {
		io.emit('chat message', msg);
	});
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log('Server is running on ' + port);
});