const respHandler = require('../../cors/responseHandler');
const errorCodes = require('../../constant/errorCodes');

const { validationResult } = require('express-validator');
const dbHandler = require('../../model/dbHandler')
const bcrypt = require("bcrypt");
const jwsHandler = require("../../cors/middleware")


module.exports = {
	login: async (req, res) => {
		
		const errors = validationResult(req); // Makes sure params 'uname' exist
		if (!errors.isEmpty())
			return respHandler.errorResponse(res, error=errors.errors[0].msg, effectedParam=errors.errors[0].param)
		
		let params = req.query;
		try {
			let user = await dbHandler.getUser(params.uname);
			if (bcrypt.compareSync(params.password, user.passwd)){
				const token = jwsHandler.provideToken(user)
				return respHandler.successResponse(res, 200, "User login successful", token)
			}else{
				return respHandler.errorResponse(res, errorCodes.UNSUCCESSFUL_LOGIN.code)
			}

		} catch (error) {
			return respHandler.errorResponse(res, error)
		}
	},
	register: async (req, res) => {
		const errors = validationResult(req); // Makes sure params 'uname' and 'passwd' exist
		if (!errors.isEmpty()){
			return respHandler.errorResponse(res, error=errors.errors[0].msg, effectedParam=errors.errors[0].param)
		}
		let params = req.query;
		let uname = params.uname;
		let email = params.email;
		
		let passwd = params.password;
		const hash = bcrypt.hashSync(passwd, 10);
		try {
			await dbHandler.registerUser(uname=uname, email=email, passwd=hash);
			respHandler.successResponse(res, 201, "New user successufully created")
		} catch (errCode) {
			respHandler.errorResponse(res, errCode)
			
		}
	},
	createWallet: async (req, res) => {
		respHandler.successResponse(res, 201, "Wallet creation request received successfully!")		
	},
}


