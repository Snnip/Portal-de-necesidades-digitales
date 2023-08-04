// Importamos los modelos
const selectEntryByIdModel = require('../../models/entries/selectEntryByIdModel');

// Función controladora
const getEntryController = async (req, res, next) => {
    try {
        // Obtenemos el path param.
        const { entryId } = req.params;

        const entry = await selectEntryByIdModel(entryId);

        res.send({
            status: 'ok',
            data: {
                entry,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getEntryController;
