const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'El valor de "{#key}" debe ser una cadena de texto',
    'any.required': 'El campo "{#key}" es requerido',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
};

// Creamos el esquema de Joi
const insertCommentSchema = joi
    .object({
        content: joi
            .string()
            .max(250)
            .required()
            .messages(joiErrorMessages),
    })
    .unknown(true);

module.exports = insertCommentSchema;
