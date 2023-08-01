// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Controladores
const authUser = require('../middlewares/authUser');
const editUserAvatarController = require('../controllers/users/editUserAvatarController');
const getUserProfileController = require('../controllers/users/getUserProfileController');
const getPrivateProfileController = require('../controllers/users/getPrivateProfileController');
const insertUserController = require('../controllers/users/insertUserController');
const loginUserController = require('../controllers/users/loginUserController');

// Endpoints usuarios
router.post(`/users/register`, insertUserController);
router.post(`/users/login`, loginUserController);
router.get(`/users/:userId`, getUserProfileController);
router.get(`/users/`, authUser, getPrivateProfileController);
router.put(`/users/avatar`, authUser, editUserAvatarController);

module.exports = router;
