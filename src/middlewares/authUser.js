// Importamos jwt para desencriptar token.
const jwt = require('jsonwebtoken');

// Importamos los errores.
const {
    notAuthenticatedError,
    invalidCredentialsError,
    outdatedTokenError,
} = require('../services/errorService');
const selectUserByIdModel = require('../models/users/selectUserByIdModel');

const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) notAuthenticatedError();

        // Info del token.
        let tokenInfo;
        try {
            // Try y catch usados para usar los mensajes personalizados y no los mensajes por default de jwt en caso de que falle .verify.
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            console.log(err); // Error para los desarrolladores.
            invalidCredentialsError(); // Error enviado al cliente.
        }

        const { authModifiedAt } = await selectUserByIdModel(tokenInfo.id);

        if (authModifiedAt !== null) {
            const datetimeFromMysql = authModifiedAt;
            const unixTimestamp = Math.floor(
                new Date(datetimeFromMysql).getTime() / 1000
            );

            if (unixTimestamp > tokenInfo.iat) outdatedTokenError();
        }

        // Creamos la propiedad 'user' en el objeto 'request'.
        req.user = tokenInfo;

        // Paso a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
