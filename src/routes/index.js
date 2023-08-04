// Importamos las dependencias
const express = require('express');
const router = express.Router();

// Importamos las rutas de los usuarios, servicios y comentarios
const usersRoutes = require('./usersRoutes');
const entriesRoutes = require('./entriesRoutes');
const commentsRoutes = require('./commentsRoutes');

// Indicamos a express donde están las rutas de los usuarios
router.use(usersRoutes);
router.use(entriesRoutes);
router.use(commentsRoutes);

module.exports = router;
