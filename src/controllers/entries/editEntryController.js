// Importamos los modelos
const selectEntryByIdModel = require('../../models/entries/selectEntryByIdModel');
const updateEntryModel = require('../../models/entries/updateEntryModel');
const editEntrySchema = require('../../schemas/entries/editEntrySchema');

// Importamos el esquema
const validateSchemaService = require('../../services/validateSchemaService');

const editEntryController = async (req, res, next) => {
    try {
        const { entryId } = req.params;
        // Validar con Joi que los campos son correctos
        await validateSchemaService(editEntrySchema, req.body);

        const entry = await selectEntryByIdModel(entryId);

        console.log(entry.category, entry.resolved);
        console.log(req.body.category, req.body.resolved);
        // Actualizamos los datos
        await updateEntryModel(
            req.body.category,
            req.body.resolved ? 1 : 0,
            entryId
        );

        res.send({
            status: 'ok',
            message: 'Servicio actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editEntryController;
