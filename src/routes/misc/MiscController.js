const respHandler = require('../../utils/responseHandler');
const errorCodes = require('../../constants/errorCodes');


module.exports = {
	defaultResponse: async (req, res) => {
		return respHandler.errorResponse(res, errorCodes.UNKNOWN_RESOURCE_REQUEST.code)
	},
}


