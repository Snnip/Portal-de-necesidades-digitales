// Importamos los modelos
const updateEntryModel = require('../../models/entries/updateEntryModel');

// Importamos el esquema
const listEntrySchema = require('../../schemas/entries/listEntrySchema');
const validateSchemaService = require('../../services/validateSchemaService');

const editEntryController = async (req, res, next) => {
    try {
        const { entryId } = req.params;
        // Validar con Joi que los campos son correctos
        await validateSchemaService(listEntrySchema, req.body);

        // Actualizamos los datos
        await updateEntryModel(req.body.category, req.body.resolved, entryId);

        res.send({
            status: 'ok',
            message: 'Servicio actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editEntryController;
