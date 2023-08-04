//Importamos modelos
const deleteCommentModel = require('../../models/comments/deleteCommentModel');
const selectCommentByIdModel = require('../../models/comments/selectCommentByIdModel');

// Importamos los servicios
const deleteFileService = require('../../services/deleteFileService');

const deleteCommentController = async (req, res, next) => {
    try {
        // Obtenemos el id del comment
        const { commentId } = req.params;

        // Obtenemos los detalles del comment
        const comment = await selectCommentByIdModel(commentId);

        if (comment.fileName) {
            // Borrar el archivo de uploads
            await deleteFileService(comment.fileName);
        }

        // Borramos el commentario de la base de datos.
        await deleteCommentModel(commentId);

        res.send({
            status: 'ok',
            message: 'Comentario eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteCommentController;
