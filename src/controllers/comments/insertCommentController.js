//Importamos modelos
const insertCommentModel = require('../../models/comments/insertCommentModel');

// Importamos esquemas.
const insertCommentSchema = require('../../schemas/comments/insertCommentSchema');

// Importamos servicios
const saveFileService = require('../../services/saveFileService');
const validateSchemaService = require('../../services/validateSchemaService');

const insertCommentController = async (req, res, next) => {
    try {
        
        // Leemos los datos
        let fileName;
        const { entryId } = req.params;
        const { content } = req.body;
        

        await validateSchemaService(insertCommentSchema, req.body);
        if (req.files?.file) {
            const { file } = req.files;
            
            // Guardamos el archivo en la carpeta.
            fileName = await saveFileService(file);
        }

        // Importamos modelos
        await insertCommentModel(
            content,
            req.user.id,
            entryId,
            fileName,)

        res.send({
            status: 'ok',
            message: 'Comentario creado'
        })
        
        
    } catch (err) {
        next(err);
    }
 }

module.exports = insertCommentController;