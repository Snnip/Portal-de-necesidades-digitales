const Joi = require('joi');

// Insertamos modelos
const insertUserModel = require('../../models/users/insertUserModel');

const insertUserController = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        // Comprobamos con Joi que se cumplan los requisitos de los datos

        await insertUserModel({ userName, email, password });
        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        // Enviamos el error al middleware de error
        next(err);
    }
};

module.exports = insertUserController;
