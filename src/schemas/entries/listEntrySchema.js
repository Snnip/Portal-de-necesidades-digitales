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
    'number.base': 'The field {#key} must be a number',
    'number.min': 'Field {#key} should be 0 or 1',
    'number.max': 'Field {#key} should be 0 or 1',
    'number.integer': 'Field {#key} should be a whole number',
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
