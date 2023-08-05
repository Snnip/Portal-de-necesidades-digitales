// Importamos los modelos.
const selectAllCommentsModel = require('../../models/comments/selectAllCommentsModel');

// Devuelve los comentarios de un servicio.
const listCommentsController = async (req, res, next) => {
    try {
        // Obtenemos los path params.
        const { entryId } = req.params;

        const comments = await selectAllCommentsModel(entryId);

        res.send({
            status: 'ok',
            data: {
                comments,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listCommentsController;
