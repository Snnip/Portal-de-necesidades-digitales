// Importamos las dependencias.
const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

// Importamos los errores.
const { saveFileError } = require('./errorService');

// Función que guarda un archivo en el directorio de subida de archivos.
const saveFileService = async (file) => {
    try {
        // Creamos la ruta absoluta al directorio de subida de archivos.
        const uploadsPath = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR
        );

        // Creamos el directorio si no existe.
        try {
            await fs.access(uploadsPath);
        } catch {
            await fs.mkdir(uploadsPath);
        }

        // Obtenemos la extensión del archivo.
        const fileExt = path.extname(file.name);

        // Creamos la ruta absoluta al directorio donde guardaremos el archivo.
        // Es importante eliminar el punto de la extensión para evitar crear una carpeta oculta.
        const dirPath = path.join(uploadsPath, fileExt.replace('.', ''));

        // Si no existe el directorio lo creamos.
        try {
            await fs.access(dirPath);
        } catch {
            await fs.mkdir(dirPath);
        }

        // Generamos un nombre único para el archivo.
        const fileName = `${uuid.v4()}${fileExt}`;

        // Generamos la ruta absoluta del archivo.
        const filePath = path.join(dirPath, fileName);

        // Guardamos el archivo.
        await file.mv(filePath);

        // Retornamos el nombre del archivo.
        return `/${fileExt.replace('.', '')}/${fileName}`;
    } catch (err) {
        // console.error(err);
        saveFileError();
    }
};

module.exports = saveFileService;
