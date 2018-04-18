const UserController = () => {
	const UserModel = app.models.userModel;

	const Controller = {

		cryptStringMd5 : (string) => {
			let _crypto = crypto.createHash('md5');

			if(!string) return "";

			return _crypto.update(string).digest("hex");
		},

		save : (req, res) => {
			return UserModel.getLogin(req.body.login).then((notExistLogin) => {
				req.body.password = Controller.cryptStringMd5(req.body.password);

				return !notExistLogin ? UserModel.insert(req.body) : false;
			});
		},

		updateTaskUser : (_sequenceUser, newTask) => {
			return UserModel.getTaskUser(_sequenceUser).then((listTask) =>{
				let task = listTask || [];

				if(Array.isArray(task)){
					task.push(newTask);
					return UserModel.update({sequence : _sequenceUser}, {task : task});
				}
			});
		},

		authenticate : (login, password) => {
			let _password = Controller.cryptStringMd5(password);

			return UserModel.authenticate(login, _password).then((res) => (res ? res : false));
		}
	}
	
	return Controller;
};

module.exports = () => {
	return UserController();
};