module.exports = () => {
	const { 
		TASK_EXIST,
		SUCCESS,
		AUTHORIZED,
		NOT_UPDATED,
		UPDATED_SUCCESS
	} = app.settings.constant;

	const TaskController = app.controllers.taskController;
	const UserController = app.controllers.userController;
	const SECRET_KEY = app.settings.defaultSettings.getSecretKey();
	
	app.post('/task', (req, res, next) => {
		const token = req.headers['authorization'];
		const { verifyToken } = app.settings.Token;
		const returnToken = verifyToken(token, SECRET_KEY);

		if(returnToken.type !== AUTHORIZED){
			res.status(401).json({status : 401, type : returnToken.type});
			return false
		}

		TaskController.save(req, res).then((response) =>{
			let dataReturn = {};

			if(response){
				UserController.updateTaskUser(returnToken.dataToken.sequence, response.sequence);
			}

			dataReturn.status = response ? 200 : 401;
			dataReturn.type = response ? SUCCESS : TASK_EXIST;
			dataReturn.data = response ? response : {name : req.body.name};

			res.status(dataReturn.status).json(dataReturn);
		});
	});

	app.put('/task/:sequence', (req, res, next) =>{
		let dataReturn = {};
		const token = req.headers['authorization'];
		const { verifyToken } = app.settings.Token;
		const returnToken = verifyToken(token, SECRET_KEY);

		if(returnToken.type !== AUTHORIZED){
			res.status(401).json({status : 401, type : returnToken.type});
			return false
		}

		TaskController.updateAll(req, res).then((response) => {
			dataReturn.status = response ? 200 : 401;
			dataReturn.type = response.nModified  ? UPDATED_SUCCESS : NOT_UPDATED;

			res.status(dataReturn.status).json(dataReturn);
		});
	});
}