const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'The value of {#key} must be a text string',
    'any.required': 'The {#key} field is required',
    'string.empty': 'The {#key} field must not be empty.',
    'string.email': 'You must provide a valid email address.',
};

// Creamos el esquema de Joi
const loginUserSchema = joi.object({
    password: joi.string().required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
});

module.exports = loginUserSchema;
