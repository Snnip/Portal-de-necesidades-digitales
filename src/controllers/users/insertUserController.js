// Insertamos los modelos.
const insertUserModel = require('../../models/users/insertUserModel');

// Importamos los servicios.
const validateSchemaService = require('../../services/validateSchemaService');

// Importamos el esquema.
const insertUserSchema = require('../../schemas/users/insertUserSchemas');

// Creamos un nuevo usuario.
const insertUserController = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        // Validamos el body con Joi.
        await validateSchemaService(insertUserSchema, req.body);

        // Insertamos el usuario.
        await insertUserModel({ userName, email, password });
        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        // Enviamos el error al middleware de error.
        next(err);
    }
};

module.exports = insertUserController;
