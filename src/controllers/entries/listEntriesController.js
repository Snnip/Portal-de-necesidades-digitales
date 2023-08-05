// Importamos los modelos.
const selectAllEntriesModel = require('../../models/entries/selectAllEntriesModel');

// Importamos los esquemas.
const listEntrySchema = require('../../schemas/entries/listEntrySchema');
const validateSchemaService = require('../../services/validateSchemaService');

// Devuelve los servicios permitiendo que se filtren por su categoría y/o por si el servicio está solucionado o no.
const listEntriesController = async (req, res, next) => {
    try {
        // Obtenemos los query params.
        const { category, resolved } = req.query;

        // Validamos con joi.
        await validateSchemaService(listEntrySchema, req.query);

        const entries = await selectAllEntriesModel(category, resolved);

        res.send({
            status: 'ok',
            data: {
                entries,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listEntriesController;
