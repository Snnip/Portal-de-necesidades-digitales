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
router.post(
    '/comments/:entryId',
    authUser,
    entryExists,
    insertCommentController
);

router.get('/comments/:entryId', authUser, entryExists, listCommentsController);

router.delete(
    '/comments/:commentId',
    authUser,
    commentExists,
    canEditComment,
    deleteCommentController
);

module.exports = router;
