// Importamos las dependencias.
const getDb = require('../db/getDb');

// Importamos los errores.
const { deleteEntryWithCommentsError } = require('../services/errorService');

// Función controladora intermedia que lanza un error si no existe.
const canDeleteEntry = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el id del comentario de los path params.
        const { entryId } = req.params;

        const [comments] = await connection.query(
            `SELECT id FROM comments WHERE entryId = ?`,
            [entryId]
        );
        // Lanzamos un error si el comentario no existe.
        if (comments.length > 0) {
            deleteEntryWithCommentsError();
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = canDeleteEntry;
