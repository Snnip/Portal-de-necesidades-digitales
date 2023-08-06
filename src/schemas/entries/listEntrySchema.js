const joi = require('joi');

// Define las opciones posibles para el campo "category"
const validCategories = [
    'video-editing',
    'image-editing',
    'document-translation',
    'document-correction',
    'code-correction',
    'other',
];

// Modificamos los mensajes de error de Joi
const joiErrorMessages = {
    'string.base': "El valor de '{#key}' debe ser una cadena",
    'any.required': "El campo '{#key}' es requerido",
    'string.empty': "El campo '{#key}' no debe estar vacío",
    'any.only':
        'El valor de la categoría debe ser uno de los siguientes: ' +
        validCategories.join(', ') +
        '.',
    'number.base': "El valor de '{#key}' debe ser un número",
    'number.min': "El valor de '{#key}' debe ser 0 o 1",
    'number.max': "El valor de '{#key}' debe ser 0 o 1",
    'number.integer': "El valor de '{#key}' debe ser un número entero",
};

// Creamos el esquema de Joi
const listEntrySchema = joi
    .object({
        category: joi
            .string()
            .valid(...validCategories)
            .messages(joiErrorMessages),
        resolved: joi
            .number()
            .integer()
            .min(0)
            .max(1)
            .messages(joiErrorMessages),
    })
    .unknown(true);

module.exports = listEntrySchema;
