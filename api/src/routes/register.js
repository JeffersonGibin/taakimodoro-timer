module.exports = (app) => {
	const UserController = app.controllers.userController;
	//const SECRET_KEY = app.settings.defaultSettings.getSecretKey();

	const { USER_EXIST, SUCCESS } = app.settings.constant;

	app.post('/register', (req, res) => {
		/*		
			const token = req.headers['authorization'];
			const { verifyToken } = app.settings.Token;
			const returnToken = verifyToken(token, SECRET_KEY);

			if(returnToken.type !== AUTHORIZED){
				res.status(401).json({status : 401, type : returnToken.type});
				return false
			}
		*/

		UserController.save(req, res).then((response) => {
			let dataReturn = {};

			dataReturn.status = response ? 200 : 401;
			dataReturn.type = response ? SUCCESS : USER_EXIST;
			dataReturn.data = response ? response : {login : req.body.login};

			res.status(dataReturn.status).json(dataReturn);
		});	

	});
}	