// Importamos dependencias.
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Importamos los modelos.
const selectUserByEmailModel = require('../../models/users/selectUserByEmailModel');

// Importamos los errores.
const { invalidCredentialsError } = require('../../services/errorService');

// Importamos los servicios.
const validateSchemaService = require('../../services/validateSchemaService');

// Importamos el esquema.
const loginUserSchema = require('../../schemas/users/loginUserSchema');

// Loguea un usuario devolviendo un token.
const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validamos el body con joi.
        await validateSchemaService(loginUserSchema, req.body);

        // Seleccionamos usuario por email.
        const user = await selectUserByEmailModel(email);

        // Verificamos que la contraseña sea correcta.
        const validPass = await bcrypt.compare(password, user.password); // (user.password, password) no funciona
        if (!validPass) invalidCredentialsError();

        // Creamos token con la info que queremos que tenga dentro.
        const payload = {
            id: user.id,
            username: user.userName,
            rol: user.role,
        };

        // Creamos token( 3 params, objeto anterior, el secreto del env y un objeto que indica el tiempo de actividad del token ).
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUserController;
