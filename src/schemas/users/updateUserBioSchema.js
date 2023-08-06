const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': "El valor de '{#key}' debe ser una cadena de texto",
    'any.required': "El campo '{#key}' es requerido",
    'string.empty': "El campo '{#key}' no debe estar vacío",
};

// Creamos el esquema de Joi
const updateUserBioSchema = joi.object({
    biography: joi.string().required().messages(joiErrorMessages),
});

module.exports = updateUserBioSchema;
