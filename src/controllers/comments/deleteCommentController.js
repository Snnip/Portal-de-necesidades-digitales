//Importamos modelos
const deleteCommentModel = require('../../models/comments/deleteCommentModel');
const insertCommentModel = require('../../models/comments/insertCommentModel');

// Importamos los errores 
const { notFoundError } = require('../../services/errorService');

// Importamos los servicios
const deleteFileService = require('../../services/deleteFileService');

const deleteCommentController = async (req, res,next) => {
    try{
        // Obtenemos el id del comment
        const { commentId } = req.params;

         // Obtenemos los detalles del comment
         const comment = await insertCommentModel(commentId);

         // Borrar el archivo de uploads
        await deleteFileService(comment.fileName);
        
        // Borramos el comment de la base de datos.
        await deleteCommentModel(commentId);

        res.send({
            status: 'ok',
            message: 'Comentario eliminado',
        });
    
    
    } catch (err){
        next(err);
    }
}

module.exports = deleteCommentController;