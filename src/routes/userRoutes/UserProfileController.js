const respHandler = require('../../utils/responseHandler');
const errorCodes = require('../../constants/errorCodes');

const { validationResult } = require('express-validator');
const dbHandler = require('../../database/dbHandler')
const etherHandler = require('../../utils/etherHandler')

const bcrypt = require("bcryptjs");
const jwsHandler = require("../../utils/middleware")

/*
Validates username and password.
*/
const validateLogin = async (uname, passwd) =>{
	try{
		let storedUser = await dbHandler.getUserWithUname(uname);
		if (bcrypt.compareSync(passwd, storedUser.passwd)){
			const token = jwsHandler.provideToken(storedUser)
			return token
		}else{
			throw errorCodes.UNSUCCESSFUL_LOGIN.code
		}
	}catch(err){
		throw errorCodes.UNSUCCESSFUL_LOGIN.code
	}
}


module.exports = {
	login: async (req, res) => {
		const errors = validationResult(req); // Makes sure params 'uname' exist
		if (!errors.isEmpty())
			return respHandler.errorResponse(res, error=errors.errors[0].msg, effectedParam=errors.errors[0].param)

		let params = req.body;
		try{
			const validationRes = await validateLogin(params.uname, params.password)
			return respHandler.successResponse(res, 200, "User login successful", validationRes)
		}catch(err){
			return respHandler.errorResponse(res, error=err)
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
			return respHandler.errorResponse(res, errCode)
		}
	},
	createWallet: async (req, res) => {
		const errors = validationResult(req); // Makes sure params 'uname' exist
		if (!errors.isEmpty())
			return respHandler.errorResponse(res, error=errors.errors[0].msg, effectedParam=errors.errors[0].param)
		let params = req.body;
		let passwd = params["password"]

		let token = req.headers['x-access-token'] || req.headers['authorization'];
		let decodedToken;
		try{
			decodedToken = await jwsHandler.decodeToken(token)
		}catch(error){
			return respHandler.errorResponse(res, errorCodes.TOKEN_ERROR.code)
		}
		const userId = decodedToken.id
		try{
			const user = await dbHandler.getUser(userId)
			try{
				await validateLogin(user.uname, params.password)
			}catch(err){
				return respHandler.errorResponse(res, error=err)
			}
			const wallet = etherHandler.createWallet();
			return respHandler.successResponse(res, 201, "Wallet sucessfully created!")	

		}catch(err){
			return respHandler.errorResponse(res, err)
		}

	
	},
}



