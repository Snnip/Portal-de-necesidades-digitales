// Importamos los modelos
const selectAllEntriesModel = require('../../models/entries/selectAllEntriesModel');

// Función controladora
const listEntriesController = async (req, res, next) => {
    try {
        // Obtenemos el query param.
        const { category, resolved } = req.query;

        // Validamos con joi
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
