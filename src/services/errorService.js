module.exports = {
    deleteEntryWithCommentsError() {
        throw {
            httpStatus: 400, // Bad request
            code: 'ENTRY_DELETED_FAILED',
            message: 'Error deleting the service. Has associated comments',
        };
    },
    deleteFileError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'FILE_DELETED_FAILED',
            message: 'Error deleting file from disk',
        };
    },
    emailAlreadyRegisteredError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'EMAIL_ALREADY_REGISTERED',
            message: 'The email is already registered',
        };
    },
    fileLimitReachedError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'VIDEO_LIMIT_REACHED',
            message: 'The limit of 1 file has been reached',
        };
    },
    invalidCredentialsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid credentials',
        };
    },
    invalidTokenError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_TOKEN',
            message: 'Invalid token',
        };
    },
    missingFieldsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'MISSING_FIELDS',
            message: 'Missing fields',
        };
    },
    notAuthenticatedError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'NOT_AUTHENTICATED',
            message: `You must send a token in the 'Authorization' header.`,
        };
    },
    notFoundError(resource) {
        throw {
            httpStatus: 404, // Not Found
            code: 'RESOURCE_NOT_FOUND',
            message: `Required resource ${resource} does not exist`,
        };
    },
    outdatedTokenError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'OUTDATED_TOKEN',
            message: 'Invalid token. Re-login',
        };
    },
    saveFileError() {
        throw {
            httpStatus: 500, // Internal Server Error
            code: 'FILE_SAVE_FAILED',
            message: 'Error saving file to disk',
        };
    },
    userNameAlreadyRegisteredError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'USERNAME_ALREADY_REGISTERED',
            message: 'The user name is already registered',
        };
    },
    userNameAlreadyExistsError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'USERNAME_ALREADY_USED',
            message: 'The user name already exists',
        };
    },
    unauthorizedUserError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'UNAUTHORIZED',
            message: 'The user is not authorized to perform this operation',
        };
    },
    unknownError() {
        throw {
            httpStatus: 500, // Conflict
            code: 'UNKOWN_ERROR',
            message: 'An unexpected error has occurred',
        };
    },
};
