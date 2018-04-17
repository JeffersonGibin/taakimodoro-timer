const Database = {};

const {host, port, database} = app.settings.defaultSettings.getDB();

Database.connect = () => {
	let DB = mongoose;

	DB.plugin(autoIncrement, {field: 'sequence'});

	DB.connect('mongodb://'+host+':'+port+'/'+database+'');

	return DB;
};

module.exports = () => {
	let DB = Database.connect(app);

	DB.connection.on('error', (e) => {
		console.info("Error connecting database!");
	});

	return DB;
};