// Importamos los modelos
const selectEntryByIdModel = require('../../models/entries/selectEntryByIdModel');
const deleteEntryModel = require('../../models/entries/deleteEntryModel');

// Importamos los servicios
const deleteFileService = require('../../services/deleteFileService');

// Función controladora
const deleteEntryController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada
        const { entryId } = req.params;

        // Obtenemos los detalles de la entrada
        const entry = await selectEntryByIdModel(entryId);

        // Borrar el archivo de uploads
        await deleteFileService(entry.fileName);

        // Borramos la entrada de la base de datos.
        await deleteEntryModel(entryId);

        res.send({
            status: 'ok',
            message: 'Archivo eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteEntryController;
