const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': "El valor de '{#key}' debe ser una cadena",
    'any.required': "El campo '{#key}' es requerido",
    'string.empty': "El campo '{#key}' no debe estar vacío",
    'string.min': 'El título debe tener al menos {#limit} caracteres',
    'string.max': "El campo '{#key}' no debe exceder los {#limit} caracteres",
    'number.base': "El valor de '{#key}' debe ser un número",
    'number.max': 'El archivo no debe exceder los 10 MB',
    'object.base': "El valor de '{#key}' debe ser un objeto",
};

// Creamos el esquema de Joi
const insertFileToCommentSchema = joi.object({
    file: joi
        .object({
            name: joi.string().min(5).max(50).required(),
            size: joi
                .number()
                .max(10000000)
                .required()
                .messages(joiErrorMessages),
        })
        .unknown(true),
});

module.exports = insertFileToCommentSchema;
