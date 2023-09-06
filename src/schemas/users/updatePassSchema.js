const joi = require('joi');

// Mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'El valor de {#key} debe ser un texto',
    'any.required': 'El campo {#key} es requerido',
    'string.empty': 'El campo {#key} no debe estar vacío',
    'string.min':
        'El nombre de usuario debe tener al menos {#limit} caracteres',
    'string.pattern.base':
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número, un símbolo de puntuación y un mínimo de 8 caracteres.',
};

// Creamos el esquema de Joi
const updatePassSchema = joi.object({
    currentPass: joi.string().required().messages(joiErrorMessages),
    newPass: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";"<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";"<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
});

module.exports = updatePassSchema;
