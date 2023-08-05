// Importamos las dependencias.
const getDb = require('../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

// Función controladora intermedia que lanza un error si no existe.
const commentExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el id del comentario de los path params.
        const { commentId } = req.params;

        const [comments] = await connection.query(
            `SELECT id FROM comments WHERE id = ?`,
            [commentId]
        );
        // Lanzamos un error si el comentario no existe.
        if (comments.length < 1) {
            notFoundError('comentario');
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = commentExists;
