const UserController = (app) => {
	const UserModel = app.models.userModel;

	const Controller = {

		cryptStringMd5 : (string) => {
			let crypto = app.crypto.createHash('md5');

			if(!string) return "";

			return crypto.update(string).digest("hex");
		},

		save : (req, res) => {
			return UserModel.getLogin(req.body.login).then((notExistLogin) => {
				req.body.password = Controller.cryptStringMd5(req.body.password);

				return !notExistLogin ? UserModel.insert(req.body) : false;
			});
		},

		authenticate : (login, password) => {
			let _password = Controller.cryptStringMd5(password);

			return UserModel.authenticate(login, _password).then((res) => (res ? res : false));
		}
	}
	
	return Controller;
};

module.exports = (app) => {
	return UserController(app);
};