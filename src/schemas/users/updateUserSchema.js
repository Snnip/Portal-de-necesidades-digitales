const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'The value of {#key} must be text',
    'any.required': 'The {#key} field is required',
    'string.empty': 'The {#key} field must not be empty.',
    'string.min': 'The biography must be at least {#limit} characters long.',
    'string.max': 'The biography must have a maximum of {#limit} characters.',
};

// Creamos el esquema de Joi
const updateUserSchema = joi
    .object({
        userName: joi.string().min(4).required().messages(joiErrorMessages),
        biography: joi.string().min(10).max(500).messages(joiErrorMessages),
    })
    .unknown(true);

module.exports = updateUserSchema;
