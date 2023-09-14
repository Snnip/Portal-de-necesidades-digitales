const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'The value of {#key} must be text',
    'any.required': 'The {#key} field is required',
    'string.empty': 'The {#key} field must not be empty.',
    'string.min': 'The biography must be at least {#limit} characters long.',
};

// Creamos el esquema de Joi
const updateUserBioSchema = joi.object({
    biography: joi.string().min(10).required().messages(joiErrorMessages),
});

module.exports = updateUserBioSchema;
