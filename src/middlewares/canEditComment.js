// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../db/getDb');

// Importamos los modelos.
const selectCommentByIdModel = require('../models/comments/selectCommentByIdModel');

// Importamos los errores.
const { unauthorizedUserError } = require('../services/errorService');

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar un comentario.
const canEditComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();
        // Obtenemos el id de un comentario en la cuál tendrá lugar el cambio.
        const { commentId } = req.params;

        // Obtenemos los datos del comentario.
        const comment = await selectCommentByIdModel(commentId);

        // Si no somos los propietarios lanzamos un error.
        if (comment.userId !== req.user.id) {
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

module.exports = canEditComment;
