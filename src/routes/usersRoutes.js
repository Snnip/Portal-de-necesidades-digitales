// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Controladores
const {
    editUserAvatarController,
    getPrivateProfileController,
    getUserProfileController,
    insertUserController,
    loginUserController,
} = require('../controllers/users');
const { authUser, userExists } = require('../middlewares');

// Endpoints usuarios
router.post(`/users/register`, insertUserController);
router.post(`/users/login`, loginUserController);
router.get(`/users/:userId`, userExists, getUserProfileController);
router.get(`/users/`, authUser, userExists, getPrivateProfileController);
router.put(`/users/avatar`, authUser, userExists, editUserAvatarController);

module.exports = router;
