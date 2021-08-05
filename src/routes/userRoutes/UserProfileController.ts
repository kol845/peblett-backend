const respHandler = require('../../utils/responseHandler');

import { errorCodes } from '../../constants/errorCodes';

const { validationResult } = require('express-validator');
import dbHandler from '../../database/dbHandler';

const etherHandler = require('../../utils/etherHandler')

const bcrypt = require("bcryptjs");
const jwsHandler = require("../../utils/middleware")

import {Request, Response} from 'express';

import { User as UserType } from '../../constants/types';

/*
Validates username and password.
*/
const validateLogin = async (uname:string, passwd:string) =>{
	try{
		const storedUser:UserType = await dbHandler.getUserWithUname(uname);
		// const storedUser: UserType | undefined = await res.json();
		// let storedUser:UserType = await dbHandler.getUserWithUname(uname);
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
const decodeToken = async(token:string)=>{
	let decodedToken;
	try{ // Validate Token
		decodedToken = await jwsHandler.decodeToken(token)
	}catch(error){
		throw errorCodes.TOKEN_ERROR.code
	}
	return decodedToken.id
}

module.exports = {
	login: async (req:Request, res:Response) => {
		const errors = validationResult(req); // Makes sure params 'uname' exist
		if (!errors.isEmpty())
			return respHandler.errorResponse(res, errors.errors[0].msg, errors.errors[0].param)
		let params = req.body;
		try{
			const validationRes = await validateLogin(params.uname, params.password)
			return respHandler.successResponse(res, 200, "User login successful", validationRes)
		}catch(err){
			return respHandler.errorResponse(res, err)
		}
	},
	register: async (req:Request, res:Response) => {
		const errors = validationResult(req); // Makes sure params 'uname' exist
		if (!errors.isEmpty())
			return respHandler.errorResponse(res, errors.errors[0].msg, errors.errors[0].param)

		let params = req.body;
		let uname = params.uname;
		let email = params.email;
		
		let passwd = params.password;
		const hash = bcrypt.hashSync(passwd, 10);
		try {
			await dbHandler.registerUser(uname, email, hash);
			return respHandler.successResponse(res, 200, "New user successufully created")
		} catch (errCode) {
			return respHandler.errorResponse(res, errCode)
		}
	},
	createWallet: async (req:Request, res:Response) => {
		const errors = validationResult(req); // Makes sure params 'uname' exist
		if (!errors.isEmpty())
			return respHandler.errorResponse(res, errors.errors[0].msg, errors.errors[0].param)
		let params = req.body;
		let passwd = params["password"]

		let token:string = <string> req.headers['x-access-token']! || req.headers['authorization']!;
		let userId:string;
		try{ // Validate Token
			userId = await decodeToken(token)
		}catch(error){
			return respHandler.errorResponse(res, error)
		}
		try{// Check if user already has wallet
			await dbHandler.getWallet(userId);
			return respHandler.errorResponse(res, errorCodes.WALLET_ALREADY_EXISTS.code)
		}catch (errCode) { // Expecting 'MISSING_WALLET' error to be thrown
			if(errCode != errorCodes.MISSING_WALLET.code) return respHandler.errorResponse(res, errCode)
		}
		try{ // Create and save wallet
			const user = await dbHandler.getUser(userId)
			await validateLogin(user.uname, passwd)
			const wallet = await etherHandler.createWallet();

			await dbHandler.createWallet(user, wallet.address, wallet);
			return respHandler.successResponse(res, 200, {address:wallet.address})

		}catch(err){
			if(err === errorCodes.UNSUCCESSFUL_LOGIN.code) return respHandler.errorResponse(res, errorCodes.PASSWORD_INVALID.code)
			else return respHandler.errorResponse(res, err)
		}

	
	},
	getWallet: async (req:Request, res:Response) => {

		let token:any = req.headers['x-access-token']! || req.headers['authorization']!;
		let userId;
		try{ // Validate Token
			userId = await decodeToken(token)
		}catch(error){
			return respHandler.errorResponse(res, error)
		}
		try {
			await dbHandler.getWallet(userId);
			return respHandler.successResponse(res, 200, "Got wallet!")
		} catch (errCode) {
			return respHandler.errorResponse(res, errCode)
		}
	},
}



