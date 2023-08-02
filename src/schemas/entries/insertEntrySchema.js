const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'any.required': 'El campo "{#key}" es requerido',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'string.min':'El nombre de usuario debe tener al menos {#limit} caracteres',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
};

// Creamos el esquema de Joi
const insertEntrySchema = joi.object({
    name: joi.string().min(10).required().messages(joiErrorMessages),
    description: joi
        .string()
        .min(10)
        .max(20)
        .required()
        .messages(joiErrorMessages),
});

module.exports = insertEntrySchema;