const UserModel = (app) => {

	const Schema = app.models.db.Schema;
	const userSchema = app.settings.collections.user;
	const userDataSchema = new Schema(userSchema, {collection: 'user'});
	const User = app.models.db.model('UserData', userDataSchema);

	return {
		insert : (data) => {
			data = new User(data);
			return data.save();	
		},

		getLogin : (_login) => {
			return User.findOne({
				login : _login
			}).then((res) => {
				return res ? res.login : false;
			});
		},

		authenticate : (_login, _password) => {
			return User.findOne({
				login : _login,
				password : _password
			});
		}
	}
};


module.exports = (app) => {
	return UserModel(app);
};