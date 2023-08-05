// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Importamos middlewares
const {
    authUser,
    canEditComment,
    commentExists,
    entryExists,
} = require('../middlewares');

// Importamos controladores
const {
    insertCommentController,
    deleteCommentController,
    listCommentsController,
} = require('../controllers/comments');

// Endpoints de comentarios

// Registrar un nuevo comentario a un servicio.
router.post(
    '/comments/:entryId',
    authUser,
    entryExists,
    insertCommentController
);

// Obtener todos los comentarios de un servicio
router.get('/comments/:entryId', authUser, entryExists, listCommentsController);

// Eliminar un comentario.
router.delete(
    '/comments/:commentId',
    authUser,
    commentExists,
    canEditComment,
    deleteCommentController
);

module.exports = router;
