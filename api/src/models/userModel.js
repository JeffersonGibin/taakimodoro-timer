const UserModel = () => {

	const Schema = app.models.db.Schema;
	const userSchema = app.settings.collections.user;
	const userDataSchema = new Schema(userSchema, {collection: 'user'});
	const User = app.models.db.model('UserData', userDataSchema);

	return {
		insert : (_data) => {
			data = new User(_data);
			return data.save();	
		},

		update : (_id, _data) => {
			_data.updateAt = new Date();
			return User.update(_id, _data);
		},

		getTaskUser  : (_sequence) => {
			return User.findOne({
				sequence : _sequence
			}).then((res) => {
				return res ? res.task : false;
			});;
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

module.exports = () => {
	return UserModel();
};