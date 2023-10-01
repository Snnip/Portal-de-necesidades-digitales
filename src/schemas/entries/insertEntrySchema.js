const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'The {#key} must be a text',
    'any.required': 'Field {#key} required',
    'string.empty': "Field {#key} shouldn't be empty",
    'string.min': 'Field {#key} must have at least {#limit} characteres',
    'string.max': 'The field {#key} cannot exceed {#limit} characters',
    'number.base': 'The field {#key} must be a number',
    'number.max': 'File cannot exceed 10 MB',
    'object.base': "The {#key}' must be an object",
};

// Creamos el esquema de Joi
const insertEntrySchema = joi
    .object({
        title: joi.string().min(5).required().messages(joiErrorMessages),
        description: joi
            .string()
            .min(10)
            .max(500)
            .required()
            .messages(joiErrorMessages),
        file: joi
            .object({
                name: joi.string().min(5).max(100).required(),
                size: joi
                    .number()
                    .max(10000000)
                    .required()
                    .messages(joiErrorMessages),
            })
            .unknown(true),
    })
    .unknown(true)
    .messages(joiErrorMessages);

module.exports = insertEntrySchema;
