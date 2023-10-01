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
    'string.base': 'The {#key} must be a text',
    'any.required': 'Field {#key} required',
    'string.empty': "Field {#key} shouldn't be empty",
    'any.only':
        'The allowed categories are: ' + validCategories.join(', ') + '.',
    'boolean.base': 'field should be a boolean type (true or false).',
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
