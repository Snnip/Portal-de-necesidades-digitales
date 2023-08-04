// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Controladores
const {
    deleteEntryController,
    editEntryController,
    insertEntryController,
    listEntriesController,
} = require('../controllers/entries');

// Middlewares
const {
    authUser,
    canEdit,
    entryExists,
    userExists,
} = require('../middlewares');

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
router.delete(
    `/entries/:entryId`,
    authUser,
    userExists,
    entryExists,
    canEdit,
    deleteEntryController
);

module.exports = router;
