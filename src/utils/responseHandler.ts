// 4XX status code related to client side error
// 5XX status code related to server side error



import { errorCodes } from '../constants/errorCodes'

import {Request, Response} from 'express';



/**
		* Success Reposnse.
		* @param {Response} res - Express response object
		* @param {number} status - Success response status code
		* @param {string} succMessage - Success response message
		* @param {any} data - Success response custom data
	*/
let successResponse = (res:Response, status:number, succMessage:string, data:any) => {
	res.status(status)
	let respObject =  		{
		status,
		message: succMessage,
		data,
	}
	res.send(
		respObject
	)
	return {
		...respObject,
		isError:false
	}
}

/**
	* Error Reposnse.
	* @param {Response} res - Express response object
	* @param {string} error - Error Status Code
	* @param {string} effectedParam - Name of parameter that caused error
*/
let errorResponse = (res:Response, error:Error|any, effectedParam?:string) => {
	const errorMsg = error.stack ? error.stack : error
	console.log("Error occured: " + errorMsg)

	let errorObj:any = errorCodes[error];
	if(!errorObj){
		errorObj = errorCodes["INTERNAL_SERVER_ERROR"];
		console.log(errorObj)
	}
	res.status(parseInt(errorObj.status))
	if(effectedParam){
		errorObj = {...errorObj, parameter:effectedParam}
	}
	res.send(errorObj)
	return {
		...errorObj,
		isError:true
	}
}


module.exports = {
	errorResponse,
	successResponse,
};
