// Importamos modelo.
const updateUserNameModel = require('../../models/users/updateUserNameModel');

// Importamos los servicios.
const validateSchemaService = require('../../services/validateSchemaService');

// Importamos los esquemas.
const updateUserNameSchema = require('../../schemas/users/updateUserNameSchema');

const editUserNameController = async (req, res, next) => {
    try {
        const { userName } = req.body;

        // Comprobamos los campos.
        await validateSchemaService(updateUserNameSchema, req.body);

        await updateUserNameModel(userName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Nombre de usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserNameController;
