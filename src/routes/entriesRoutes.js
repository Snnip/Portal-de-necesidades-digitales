// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Controladores
const {
    insertEntryController,
    listEntriesController,
    editEntryController,
} = require('../controllers/entries');
const { authUser, canEdit, entryExists, userExists } = require('../middlewares');

// Endpoints servicios
router.post(`/entries`, authUser, userExists, insertEntryController);
router.get(`/entries`, listEntriesController);
router.put(
    `/entries/:entryId`,
    authUser,
    userExists,
    entryExists,
    canEdit,
    editEntryController
);

module.exports = router;
