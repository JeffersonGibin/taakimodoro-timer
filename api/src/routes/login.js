module.exports = (app) => {
	const SECRET_KEY = app.settings.defaultSettings.getSecretKey();

	const {
		INVALID_PARAMETERS,
		NOT_AUTHORIZED,
		USER_NOT_FIND,
		SUCCESS,
	 } = app.settings.constant;
	 
	const UserController = app.controllers.userController;

	const { generateToken } = app.settings.Token;

	app.post('/login', (req, res) => {

			if((!req.body.login || !req.body.password)){
				res.status(400).json({
					msg : "Parameters is required!", 
					type :  INVALID_PARAMETERS, 
					status : 400,
				});

				return false;
			}

			UserController
				.authenticate(req.body.login, req.body.password).then((response) => {
					let dataReturn = {};
					let encodedToken = generateToken({login: response.login}, SECRET_KEY, 600);

					dataReturn.status = !response ? 401 : 200;
					dataReturn.type = !response ? USER_NOT_FIND : SUCCESS;
					dataReturn.token = response ? encodedToken : "";
					dataReturn.authorized = !response ? false : true;

					res.status(dataReturn.status).json(dataReturn);
			}).catch((error) =>{
				res.status(403).json({status : 403, type : NOT_AUTHORIZED});
			});
	});
};