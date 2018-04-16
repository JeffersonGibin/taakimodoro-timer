module.exports = () => {
	const defaultTimeExpiration = 60 * 60 * 24 * 7;

	const {
		TOKEN_REQUIRED,
		TOKEN_EXPIRED,
		INVALID_TOKEN,
		AUTHORIZED
	} = app.settings.constant;

	return {
		verifyToken : (token, secretKey) => {
			const returnData = {type : AUTHORIZED, msg : "", dataToken : {}};

			try {
				if(!secretKey){
					return false;	
				} 

				if(!token){
					returnData.type = TOKEN_REQUIRED;
					return returnData;
				}
				returnData.dataToken = jwt.verify(token, secretKey);			  	
			  	return returnData;

			} catch(err) {
				returnData.type = err.expiredAt ? TOKEN_EXPIRED : INVALID_TOKEN;
			  	
			  	return returnData;
			}
		},

		generateToken : (data, secretKey, timeExpiration) => {
			let time = timeExpiration ? timeExpiration : defaultTimeExpiration;

			if(!secretKey){
				return false;	
			} 

			if(!data){
				return false;
			}

			return jwt.sign(data, secretKey, {expiresIn: time });;
		}

	}


}