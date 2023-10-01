const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'The {#key} must be a text',
    'any.required': 'Field {#key} required',
    'string.empty': "Field {#key} shouldn't be empty",
    'string.max': 'The field {#key} cannot exceed {#limit} characters',
};

// Creamos el esquema de Joi
const insertCommentSchema = joi
    .object({
        content: joi.string().max(250).required().messages(joiErrorMessages),
    })
    .unknown(true);

module.exports = insertCommentSchema;
