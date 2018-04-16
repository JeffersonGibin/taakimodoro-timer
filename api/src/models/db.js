var Database = {};

Database.connect = function(app){
	let db = app.mongoose;

	const {host, port, database} = app.settings.defaultSettings.getDB();

	db.connect('mongodb://'+host+':'+port+'/'+database+'');

	return db;
};

module.exports = (app) => {
	var db = Database.connect(app);

	db.connection.on('error', (e) => {
		console.info("Error connecting database!");
	});

	return db;
};