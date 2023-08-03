// Importamos los modelos
const selectAllEntriesModel = require('../../models/entries/selectAllEntriesModel');
const listEntrySchema = require('../../schemas/entries/listEntrySchema');
const validateSchemaService = require('../../services/validateSchemaService');

// Función controladora
const listEntriesController = async (req, res, next) => {
    try {
        // Obtenemos el query param.
        let { category, resolved } = req.query;

        // Validamos con joi
        await validateSchemaService(listEntrySchema, req.query);

        if (!resolved) {
            resolved = '';
        } else if (resolved === 'true') {
            resolved = 1;
        } else if (resolved === 'false') {
            resolved = 0;
        }

        // Utilizando el modelo
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
