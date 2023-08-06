// Importamos modelo.
const updateUserBioModel = require('../../models/users/updateUserBioModel');

// Importamos los servicios.
const validateSchemaService = require('../../services/validateSchemaService');

// Importamos los esquemas.
const updateUserBioSchema = require('../../schemas/users/updateUserBioSchema');

const editUserBioController = async (req, res, next) => {
    try {
        const { biography } = req.body;

        // Comprobamos los campos.
        await validateSchemaService(updateUserBioSchema, req.body);

        await updateUserBioModel(biography, req.user.id);

        res.send({
            status: 'ok',
            message: 'Biografía actualizada',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserBioController;
