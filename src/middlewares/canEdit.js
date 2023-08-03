// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../db/getDb');

// Importamos los modelos.
const selectEntryByIdModel = require('../models/entries/selectEntryByIdModel');

// Importamos los errores.
const { unauthorizedUserError } = require('../services/errorService');

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar
// una entrada.
const canEdit = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el id de la entrada en la cuál tendra lugar el cambio.
        const { entryId } = req.params;

        // Obtenemos los datos de la entrada.
        const entry = await selectEntryByIdModel(entryId);

        // Si no somos los propietarios lanzamos un error.
        if (entry.userId !== req.user.id) {
            unauthorizedUserError();
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = canEdit;
