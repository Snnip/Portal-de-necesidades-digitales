const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

// Funcrión que guarda un archivo en el directorio de subida de archivos.
const saveFileService = async (file) => {
    try {
        // Creamos la ruta absoluta al directorio de subida de archivos.
        const uploadsPath = path.join(__dirname, '..', '..', 'uploads');

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
        } catch (error) {
            await fs.mkdir(dirPath);
        }

        // Generamos un nombre único para el archivo.
        const fileName = `${uuid.v4()}${fileExt}`; //

        // Generamos la ruta absoluta del archivo.
        const filePath = path.join(dirPath, fileName);

        // Guardamos el archivo.
        await file.mv(filePath);

        // Retornamos el nombre del archivo.
        return fileName;
    } catch (error) {
        console.error(error);

        const err = new Error('Error al guardar el archivo en el disco');
        throw err;
    }
};

module.exports = saveFileService;
