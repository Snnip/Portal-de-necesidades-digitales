// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Importamos middlewares
const { authUser, entryExists } = require('../middlewares');

// Importamos controladores
const insertCommentController = require('../controllers/comments/insertCommentController');

// Endpoints de comentarios
router.post(
    '/comments/:entryId',
    authUser,
    entryExists,
    insertCommentController
);

module.exports = router;
