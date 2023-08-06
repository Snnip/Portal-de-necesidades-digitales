const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': "El valor de '{#key}' debe ser una cadena de texto",
    'any.required': "El campo '{#key}' es requerido",
    'string.min':
        'El nombre de usuario debe tener al menos {#limit} caracteres',
};

// Creamos el esquema de Joi
const updateUserNameSchema = joi.object({
    userName: joi.string().min(4).required().messages(joiErrorMessages),
});

module.exports = updateUserNameSchema;
