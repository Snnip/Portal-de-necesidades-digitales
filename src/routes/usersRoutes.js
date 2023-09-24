// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Controladores
const {
    editUserAvatarController,
    editUserBioController,
    editUserNameController,
    editUserPassController,
    editUserController,
    getPrivateProfileController,
    getUserProfileController,
    insertUserController,
    loginUserController,
} = require('../controllers/users');

const {
    authUser,
    emailExists,
    userExists,
    userNameExists,
    canEdit,
} = require('../middlewares');

// -- ENDPOINTS DE USERS --

// Registrar un nuevo usuario
router.post(
    `/users/register`,
    emailExists,
    userNameExists,
    insertUserController
);

// Loguear un usuario retornando un token
router.post(`/users/login`, loginUserController);

// Obtener el perfil privado del usuario logueado
router.get(`/users/`, authUser, userExists, getPrivateProfileController);

// Obtener el perfil público del usuario logueado
router.get(`/users/:userId`, userExists, getUserProfileController);

// Actualizar el avatar del usuario logueado
router.put(`/users/avatar`, authUser, userExists, editUserAvatarController);

// Actualizar la contraseña del usuario logueado
router.put(`/users/password`, authUser, userExists, editUserPassController);

// Actualizar el nombre del usuario logueado
router.put(
    `/users/userName`,
    authUser,
    userExists,
    userNameExists,
    editUserNameController
);

// Actualizar el nombre del usuario logueado
router.put(
    `/users/update-profile`,
    authUser,
    userExists,
    userNameExists,
    editUserController
);

// Actualizar la biografía del usuario logueado
router.put(`/users/biography`, authUser, userExists, editUserBioController);

module.exports = router;
