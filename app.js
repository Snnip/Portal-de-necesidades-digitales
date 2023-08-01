// Importamos y hacemos uso de "dotenv".
require('dotenv').config();

// Importamos las demás dependencias.
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

// Definimos el puerto.
const port = process.env.PORT || 3000;

// Importamos las rutas.
const routes = require('./src/routes/userRoutes');

// Importamos los errores.
const errorController = require('./src/controllers/errors/errorController');
// const {
//     notFoundController,
//     errorController,
// } = require('./src/controllers/errors');

// Creamos el servidor.
const app = express();

// Middleware que evita que las CORS interfieran a la hora de conectar el frontend con
// el backend.
app.use(cors());

// Middleware que muestra por consola información sobre la petición entrante.
app.use(morgan('dev'));

// Middleware que indica a express cuál es el directorio de ficheros estáticos.
app.use(express.static(process.env.UPLOADS_DIR));

// Middleware que "desencripta" un body en formato "raw" creando la propiedad
// "body" en el objeto "request".
app.use(express.json());

// Middleware que "desencripta" un body en formato "form-data" creando la propiedad
// "body" y la propiedad "files" en el objeto "request".
app.use(fileUpload());

// Middleware que indica a express dónde están las rutas.
app.use(routes);

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// Middleware de error.
app.use(errorController);

app.listen(port, () => {
    console.log(`Server listening at http://locahost:${port}`);
});
