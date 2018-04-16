var main = require('./server.json');

var DefaultSettings = {};

DefaultSettings.getServer = () => {
	return main.server ? main.server : {};
};

DefaultSettings.getDB = () => {
	return main.database ? main.database : {};
}

DefaultSettings.getSecretKey = () => {
	return main.scret_key ? main.scret_key : {};
}

DefaultSettings.getDevMode = () => {
	return main.development_mode ? main.development_mode : {};
};

module.exports = (app) => {
	return DefaultSettings;
};