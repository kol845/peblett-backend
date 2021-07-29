const respHandler = require('../../utils/responseHandler');

import {Request, Response} from 'express';

import { errorCodes } from '../../constants/errorCodes'


module.exports = {
	defaultResponse: async (req:Request, res:Response) => {
		return respHandler.errorResponse(res, errorCodes.UNKNOWN_RESOURCE_REQUEST.code)
	},
}


