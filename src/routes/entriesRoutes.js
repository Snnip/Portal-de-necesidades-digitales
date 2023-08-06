// Importamos express y creamos router
const express = require('express');
const router = express.Router();

// Controladores
const {
    deleteEntryController,
    editEntryController,
    getEntryController,
    insertEntryController,
    listEntriesController,
} = require('../controllers/entries');

// Middlewares
const {
    authUser,
    canEdit,
    entryExists,
    userExists,
    canDeleteEntry,
} = require('../middlewares');

// Endpoints servicios

// Registrar un nuevo servicio
router.post(`/entries`, authUser, userExists, insertEntryController);

// Obtener la lista de todos los servicios
router.get(`/entries`, listEntriesController);

// Obtener un servicio específico
router.get(`/entries/:entryId`, entryExists, getEntryController);

// Actualizar la información de un servicio
router.put(
    `/entries/:entryId`,
    authUser,
    userExists,
    entryExists,
    canEdit,
    editEntryController
);

// Eliminar un servicio
router.delete(
    `/entries/:entryId`,
    authUser,
    userExists,
    entryExists,
    canEdit,
    canDeleteEntry,
    deleteEntryController
);

module.exports = router;
