const { PORT, server } = require('./app')();

server.listen(PORT, (req, res) => {
	console.info('Server is running on port '+ PORT);
});