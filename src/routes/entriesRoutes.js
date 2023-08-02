// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Controladores
const { insertEntryController} = require('../controllers/entries')
const { authUser, userExists } = require('../middlewares');

// Endpoints servicios
router.post(`/entries`,authUser, userExists, insertEntryController);

module.exports = router;