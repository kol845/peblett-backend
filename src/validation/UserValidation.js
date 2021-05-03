const { body, check } = require('express-validator');
const errorCodes = require('../constant/errorCodes');

module.exports = {
  login: () => {
    return [
      check("uname", errorCodes.PARAMETER_MISSING.code).exists(),
      check("password", errorCodes.PARAMETER_MISSING.code).exists(),

      check("uname", errorCodes.PARAMETER_EMPTY.code).not().isEmpty(),
      check("password", errorCodes.PARAMETER_EMPTY.code).not().isEmpty(),
    ]
  },
  register: () => {
    return [
      check("uname", errorCodes.PARAMETER_MISSING.code).exists(),
      check("email", errorCodes.PARAMETER_MISSING.code).exists(),
      check("password", errorCodes.PARAMETER_MISSING.code).exists(),

      check("uname", errorCodes.PARAMETER_EMPTY.code).not().isEmpty(),
      check("email", errorCodes.PARAMETER_EMPTY.code).not().isEmpty(),
      check("password", errorCodes.PARAMETER_EMPTY.code).not().isEmpty(),

      check("email", errorCodes.EMAIL_INVALID.code).isEmail(),

      check("uname", errorCodes.PARAMETER_TOO_LONG.code).isLength({ max: 128 }),
      check("email", errorCodes.PARAMETER_TOO_LONG.code).isLength({ max: 128 }),
      check("password", errorCodes.PARAMETER_TOO_LONG.code).isLength({ max: 256 }),
    ]
  },
}