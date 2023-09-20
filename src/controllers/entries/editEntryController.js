// Importamos los modelos.
const updateEntryModel = require('../../models/entries/updateEntryModel');

// Importamos los errores
const { missingFieldsError } = require('../../services/errorService');

// Importamos el esquema.
const listEntrySchema = require('../../schemas/entries/listEntrySchema');
const validateSchemaService = require('../../services/validateSchemaService');

const editEntryController = async (req, res, next) => {
    try {
        const { entryId } = req.params;
        // Validar con Joi que los campos son correctos.
        await validateSchemaService(listEntrySchema, req.body);

        if (!req.body?.category && !req.body?.resolved) missingFieldsError();

        // Actualizamos los datos.
        const updatedEntry = await updateEntryModel(
            req.body.category,
            req.body.resolved,
            entryId
        );

        res.send({
            status: 'ok',
            data: {
                updatedEntry,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editEntryController;
