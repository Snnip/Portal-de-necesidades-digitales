const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'any.required': 'El campo "{#key}" es requerido',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}"',
};

// Creamos el esquema de Joi
const loginUserSchema = joi.object({
    password: joi.string().required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
});

module.exports = loginUserSchema;
