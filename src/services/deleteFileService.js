// Importamos las dependencias.
const fs = require('fs/promises');
const path = require('path');
const { deleteFileError } = require('./errorService');

// Función que guarda un archivo en el directorio de subida de archivos.
const deleteFileService = async (fileName) => {
    // Obtenemos la extensión del archivo.
    const fileExt = path.extname(fileName).replace('.', '');
    try {
        // Ruta absoluta al archivo a eliminar.
        const filePath = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR,
            fileName
        );

        // Comprobamos si el archivo existe.
        try {
            await fs.access(filePath);
        } catch {
            // Si no existe el archivo salimos de la función.
            return;
        }

        // Eliminamos el archivo de la carpeta.
        await fs.unlink(filePath);
    } catch (err) {
        console.error(err);
        deleteFileError();
    }
};

module.exports = deleteFileService;
