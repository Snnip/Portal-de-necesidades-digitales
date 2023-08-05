// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Controladores
const {
    editUserAvatarController,
    editUserPassController,
    getPrivateProfileController,
    getUserProfileController,
    insertUserController,
    loginUserController,
} = require('../controllers/users');
const { authUser, userExists } = require('../middlewares');

// -- ENDPOINTS DE USERS --
// Registrar un nuevo usuario
router.post(`/users/register`, insertUserController);

// Loguear un usuario retornando un token
router.post(`/users/login`, loginUserController);

// Obtener el perfil público de un usuario
router.get(`/users/:userId`, userExists, getUserProfileController);

// Obtener el perfil privado de un usuario
router.get(`/users/`, authUser, userExists, getPrivateProfileController);

// Actualizar el avatar de un usuario
router.put(`/users/avatar`, authUser, userExists, editUserAvatarController);

// Actualizar la contraseña de un usuario
router.put(`/users/password`, authUser, userExists, editUserPassController);

module.exports = router;
