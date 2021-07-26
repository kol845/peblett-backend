const respHandler = require('../../cors/responseHandler');
const errorCodes = require('../../constant/errorCodes');

const { validationResult } = require('express-validator');
const dbHandler = require('../../model/dbHandler')
const etherHandler = require('../../model/etherHandler')

const bcrypt = require("bcryptjs");
const jwsHandler = require("../../cors/middleware")

/*
Validates username and password.
*/
const validateLogin = async (uname, passwd) =>{
	try {
		let storedUser = await dbHandler.getUserWithUname(uname);
		if (bcrypt.compareSync(passwd, storedUser.passwd)){
			const token = jwsHandler.provideToken(storedUser)
			return {valid:true, token:token}
		}else{
			return {valid:false, error:errorCodes.UNSUCCESSFUL_LOGIN.code}
		}
	} catch (error) {
		return {valid:false, error:error}
	}
}


module.exports = {
	login: async (req, res) => {
		const errors = validationResult(req); // Makes sure params 'uname' exist
		if (!errors.isEmpty())
			return respHandler.errorResponse(res, error=errors.errors[0].msg, effectedParam=errors.errors[0].param)

		let params = req.body;
		const validationRes = await validateLogin(params.uname, params.password)
		if(validationRes.valid == true) return respHandler.successResponse(res, 200, "User login successful", validationRes.token)
		else{
			return respHandler.errorResponse(res, validationRes.error);
		}
	},
	register: async (req, res) => {
		const errors = validationResult(req); // Makes sure params 'uname' exist
		if (!errors.isEmpty())
			return respHandler.errorResponse(res, error=errors.errors[0].msg, effectedParam=errors.errors[0].param)

		let params = req.body;
		let uname = params.uname;
		let email = params.email;
		
		let passwd = params.password;
		const hash = bcrypt.hashSync(passwd, 10);
		try {
			await dbHandler.registerUser(uname=uname, email=email, passwd=hash);
			return respHandler.successResponse(res, 201, "New user successufully created")
		} catch (errCode) {
			respHandler.errorResponse(res, errCode)
			
		}
	},
	createWallet: async (req, res) => {
		const errors = validationResult(req); // Makes sure params 'uname' exist
		if (!errors.isEmpty())
			return respHandler.errorResponse(res, error=errors.errors[0].msg, effectedParam=errors.errors[0].param)
		let params = req.body;
		let passwd = params["password"]

		let token = req.headers['x-access-token'] || req.headers['authorization'];
		const decodedToken = await jwsHandler.decodeToken(token)
		const userId = decodedToken.id

		try{
			const user = await dbHandler.getUser(userId)
		
			const validationRes = await validateLogin(user.uname, passwd)
			if(validationRes.valid == true) {
				const wallet = etherHandler.createWallet();
				return respHandler.successResponse(res, 201, "Wallet sucessfully created!")	
			}
			else{
				return respHandler.errorResponse(res, validationRes.error);
			}


		}catch(error){
			return respHandler.errorResponse(res, error)
		}

	
	},
}



