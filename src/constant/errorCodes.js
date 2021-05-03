const errorCodes = {
    DUPLICATE_USER_ERROR: {
        code: 'DUPLICATE_USER_ERROR',
        message: 'The user already exists try another username',
        status: '400'
    },
    DUPLICATE_EMAIL_ERROR: {
        code: 'DUPLICATE_EMAIL_ERROR',
        message: 'A user with that email already exists.',
        status: '400'
    },
    PARAMETER_MISSING: {
        code: 'PARAMETER_MISSING',
        message: 'Your request is missing one or more required parameters.',
        status: '400'
    },
    PARAMETER_EMPTY: {
        code: 'PARAMETER_EMPTY',
        message: 'One or more required parameters are empty',
        status: '400'
    },
    EMAIL_INVALID: {
        code: 'EMAIL_INVALID',
        message: 'The given email is not a email',
        status: '400'
    },
    PARAMETER_TOO_LONG: {
        code: 'PARAMETER_TOO_LONG',
        message: 'One or more parameters exceed the maximum allowed characters',
        status: '400'
    },
    UNSUCCESSFUL_LOGIN: {
        code: 'UNSUCCESSFUL_LOGIN',
        message: 'Invalid login credentials. Please ensure that you have written your username and password correctly',
        status: '400'
    },
    TOKEN_MISSING: {
        code: 'TOKEN_MISSING',
        message: 'Token not found in request parameter',
        status: '400'
    },
    TOKEN_ERROR: {
        code: 'TOKEN_ERROR',
        message: 'Invalid token found',
        status: '400'
    },
    UNKNOWN_ERROR: {
        code: 'UNKNOWN_ERROR',
        message: 'A Unknown error occured',
        status: '500'
    },
}
module.exports = errorCodes;