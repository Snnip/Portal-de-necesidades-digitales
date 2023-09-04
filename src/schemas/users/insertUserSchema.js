const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': "El valor de '{#key}' debe ser una cadena de texto",
    'any.required': "El campo '{#key}' es requerido",
    'string.empty': "El campo '{#key}' no debe estar vacío",
    'string.min':
        'El nombre de usuario debe tener al menos {#limit} caracteres',
    'string.email':
        "Debe proporcionar un correo electrónico válido para '{#key}'",
    'string.pattern.base':
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número, un símbolo de puntuación y un mínimo de 8 caracteres para '{#key}'",
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
