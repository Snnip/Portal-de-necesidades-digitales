// Importamos modelo.
const updateUserPassModel = require('../../models/users/updateUserPassModel');

// Importamos los servicios.
const validateSchemaService = require('../../services/validateSchemaService');

// Importamos los esquemas.
const updatePassSchema = require('../../schemas/users/updatePassSchema');

const editUserPassController = async (req, res, next) => {
    try {
        const { currentPass, newPass } = req.body;

        // Comprobamos los campos.
        await validateSchemaService(updatePassSchema, req.body);

        await updateUserPassModel(currentPass, newPass, req.user.id);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserPassController;
