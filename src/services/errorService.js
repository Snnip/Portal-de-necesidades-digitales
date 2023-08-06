module.exports = {
    deleteEntryWithCommentsError() {
        throw {
            httpStatus: 400, // Bad request
            code: 'ENTRY_DELETED_FAILED',
            message:
                'Error al eliminar el servicio. Tiene comentarios asociados',
        };
    },
    deleteFileError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'FILE_DELETED_FAILED',
            message: 'Error al eliminar el archivo del disco',
        };
    },
    emailAlreadyRegisteredError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'EMAIL_ALREADY_REGISTERED',
            message: 'El email ya está registrado',
        };
    },
    fileLimitReachedError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'VIDEO_LIMIT_REACHED',
            message: 'Se ha alcanzado el límite de 1 archivo',
        };
    },
    invalidCredentialsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_CREDENTIALS',
            message: 'Credenciales inválidas',
        };
    },
    invalidTokenError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_TOKEN',
            message: 'Token inválido',
        };
    },
    missingFieldsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'MISSING_FIELDS',
            message: 'Faltan campos',
        };
    },
    notAuthenticatedError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'NOT_AUTHENTICATED',
            message: `Debes enviar un token en el header 'Authorization'`,
        };
    },
    notFoundError(resource) {
        throw {
            httpStatus: 404, // Not Found
            code: 'RESOURCE_NOT_FOUND',
            message: `El recurso requerido '${resource}' no existe`,
        };
    },
    saveFileError() {
        throw {
            httpStatus: 500, // Internal Server Error
            code: 'FILE_SAVE_FAILED',
            message: 'Error al guardar el archivo en el disco',
        };
    },
    userNameAlreadyRegisteredError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'USERNAME_ALREADY_REGISTERED',
            message: 'El nombre de usuario ya está registrado',
        };
    },
    userNameAlreadyExistsError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'USERNAME_ALREADY_USED',
            message: 'El nombre de usuario ya existe',
        };
    },
    unauthorizedUserError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'UNAUTHORIZED',
            message: 'El usuario no está autorizado para hacer esta operación',
        };
    },
    unknownError() {
        throw {
            httpStatus: 500, // Conflict
            code: 'UNKOWN_ERROR',
            message: 'Ha ocurrido un error inesperado',
        };
    },
};
