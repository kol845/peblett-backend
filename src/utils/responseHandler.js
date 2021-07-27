// 4XX status code related to client side error
// 5XX status code related to server side error

const errorCodes = require("../constants/errorCodes")




/**
		* Success Reposnse.
		* @param {Response} res - Express response object
		* @param {number} status - Success response status code
		* @param {string} succMessage - Success response message
		* @param {any} data - Success response custom data
	*/
let successResponse = (res, status, succMessage, data) => {
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
let errorResponse = (res, error, effectedParam) => {
	const errorMsg = error.stack ? error.stack : error
	console.log("Error occured: " + errorMsg)

	let errorObj = errorCodes[error];
	if(!errorObj){
		errorObj = errorCodes["INTERNAL_SERVER_ERROR"];
		console.log(errorObj)
	}
	res.status(errorObj.status)
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
