// Importamos las dependencias.
const getDb = require('../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

// Función controladora intermedia que lanza un error si no existe.
const entryExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el id del archivo de los path params.
        const { entryId } = req.params;

        const [entries] = await connection.query(
            `SELECT id FROM entries WHERE id = ?`,
            [entryId]
        );

        // Lanzamos un error si el archivo no existe.
        if (entries.length < 1) {
            notFoundError('servicio');
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = entryExists;
