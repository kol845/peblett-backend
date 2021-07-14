const respHandler = require('../../cors/responseHandler');
const errorCodes = require('../../constant/errorCodes');

const { validationResult } = require('express-validator');
const dbHandler = require('../../model/dbHandler')
const bcrypt = require("bcryptjs");
const jwsHandler = require("../../cors/middleware")


module.exports = {
	defaultResponse: async (req, res) => {
		return respHandler.errorResponse(res, errorCodes.UNKNOWN_RESOURCE_REQUEST.code)
	},
}


