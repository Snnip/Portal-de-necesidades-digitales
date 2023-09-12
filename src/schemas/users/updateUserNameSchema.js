const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'The value of {#key} must be text',
    'any.required': 'The {#key} field is required',
    'string.empty': 'The {#key} field must not be empty.',
    'string.min': 'The user name must be at least {#limit} characters long.',
};

// Creamos el esquema de Joi
const updateUserNameSchema = joi.object({
    userName: joi.string().min(4).required().messages(joiErrorMessages),
});

module.exports = updateUserNameSchema;
