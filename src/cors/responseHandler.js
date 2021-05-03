// 4XX status code related to client side error
// 5XX status code related to server side error

const errorCodes = require("../constant/errorCodes")




/**
		* Success Reposnse.
		* @param {number} status - Success response status
		* @param {string} succMessage - Success response message
		* @param {any} data - Success response custom data
	*/
let successResponse = (res, status, succMessage, data) => {
	res.status(201)
	res.send(
		{
			status,
			message: succMessage,
			data
		}
	)
	return {
		status,
		message: succMessage,
		data
	}
}

/**
		* Error Reposnse.
		* @param {Response} res - Send error response
		* @param {number} statusCode - Error Status Code
	*/
let errorResponse = (res, error, effectedParam) => {
	console.log("Error Occured: " + error)

	let errorObj = errorCodes[error];
	if(!errorObj){
		console.log("Error object not found! Error code probebly misspelled somewhere.")
		return
	}
	res.status(errorObj.status)
	if(effectedParam){
		errorObj = {...errorObj, parameter:effectedParam}
	}
	res.send(errorObj)
	
}


module.exports = {
	errorResponse,
	successResponse,
};
