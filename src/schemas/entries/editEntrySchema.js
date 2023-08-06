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
    'boolean.base':
        'El campo de resolución debe ser un valor booleano (true o false).',
};

// Creamos el esquema de Joi
const editEntrySchema = joi
    .object({
        category: joi
            .string()
            .valid(...validCategories)
            .required()
            .messages(joiErrorMessages),
        resolved: joi.boolean().required().messages(joiErrorMessages),
    })
    .unknown(true);

module.exports = editEntrySchema;
