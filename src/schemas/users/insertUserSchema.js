const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'The value of {#key} must be a text string',
    'any.required': 'The {#key} field is required',
    'string.empty': 'The {#key} field must not be empty.',
    'string.min': 'The user name must be at least {#limit} characters long.',
    'string.email': 'You must provide a valid email address.',
    'string.pattern.base':
        'The password must contain at least one uppercase letter, one lowercase letter, one number, one punctuation symbol and a minimum of 8 characters.',
};

// Creamos el esquema de Joi
const insertUserSchema = joi.object({
    userName: joi.string().min(4).required().messages(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";"<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";"<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
});

module.exports = insertUserSchema;
