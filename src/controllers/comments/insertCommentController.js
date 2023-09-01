//Importamos modelos.
const insertCommentModel = require('../../models/comments/insertCommentModel');

// Importamos esquemas.
const insertCommentSchema = require('../../schemas/comments/insertCommentSchema');
const insertFileToCommentSchema = require('../../schemas/comments/insertFileToCommentSchema');

// Importamos servicios.
const saveFileService = require('../../services/saveFileService');
const validateSchemaService = require('../../services/validateSchemaService');

const insertCommentController = async (req, res, next) => {
    try {
        // Leemos los datos.
        let fileName;
        const { entryId } = req.params;
        const { content } = req.body;

        await validateSchemaService(insertCommentSchema, req.body);
        if (req.files?.file) {
            await validateSchemaService(insertFileToCommentSchema, req.files);
            const { file } = req.files;

            // Guardamos el archivo en la carpeta.
            fileName = await saveFileService(file);
        }

        // Insertamos el comentario y obtenemos el id asignado.
        const commentId = await insertCommentModel(
            content,
            req.user.id,
            entryId,
            fileName
        );

        // Devolveremos datos útiles para el front.
        res.send({
            status: 'ok',
            data: {
                comment: {
                    id: commentId,
                    userId: req.user.id,
                    entryId,
                    content,
                    fileName,
                    // createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = insertCommentController;
