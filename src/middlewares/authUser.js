// Importamos jwt para desencriptar token
const jwt = require('jsonwebtoken');

// Importamos errores
const {
    notAuthenticatedError,
    invalidCredentialsError,
} = require('../services/errorService');

const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) notAuthenticatedError();

        // Info del token
        let tokenInfo;
        try {
            // Try y catch usados para usar los mensajes personalizados y no los mensajes por default de jwt en caso de que falle .verify
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            console.log(err); // Error para los desarrolladores
            invalidCredentialsError(); // Error enviado al cliente
        }

        // Creamos la propiedad 'user' en el objeto 'request'
        req.user = tokenInfo;
        // Paso a la siguiente funcion controladora
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
