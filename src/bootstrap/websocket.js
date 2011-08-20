exports.bootstrap = function (resources) {
	return require('socket.io').listen(resources.config.webSocket.port);
};
