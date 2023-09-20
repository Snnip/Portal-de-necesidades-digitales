// Importamos la función que devuelve la conexión con la base de datos
const getDb = require('../../db/getDb');

// Importamos modelo
const selectEntryByIdModel = require('./selectEntryByIdModel');

// Función que realiza una consulta a la base de datos para actualizar una entrada.
const updateEntryModel = async (category, resolved, entryId) => {
    let connection;

    try {
        connection = await getDb();

        const queryArgs = [entryId];
        let query =
            'UPDATE entries SET resolved = ?, category = ? WHERE id = ?';
        if (category !== undefined) {
            queryArgs.unshift(category);
            if (resolved === undefined) {
                query = 'UPDATE entries SET category = ? WHERE id = ?';
            }
        }
        if (resolved !== undefined) {
            queryArgs.unshift(resolved);
            if (category === undefined) {
                query = 'UPDATE entries SET resolved = ? WHERE id = ?';
            }
        }

        // Actualizamos el servicio
        await connection.query(query, queryArgs);

        // Seleccionamos los datos de la entrada actualizada.
        const updatedEntry = await selectEntryByIdModel(entryId);

        // Retornamos el servicio actualizado.

        return updatedEntry;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateEntryModel;
