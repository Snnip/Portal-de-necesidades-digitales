// Importamos dependencias
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Importamos errores
const {
    invalidCredentialsError,
    missingFieldsError,
} = require('../../services/errorService');

// Importamos modelos
const selectUserByEmailModel = require('../../models/users/selectUserByEmailModel');

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Si faltan campos lanzamos error
        if (!email || !password) missingFieldsError();

        // Seleccionamos usuario por email.
        const user = await selectUserByEmailModel(email);

        // Verificamos que la contraseña sea correcta
        const validPass = await bcrypt.compare(password, user.password); // (user.password, password) no funciona
        if (!validPass) invalidCredentialsError();

        // Creamos token con la info que queremos que tenga dentro
        const payload = {
            id: user.id,
            username: user.userName,
        };

        // Creamos token( 3 params, objeto anterior, el secreto del env y un objeto que indica el tiempo de actividad del token )
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
