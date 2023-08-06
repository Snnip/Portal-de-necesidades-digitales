// Importamos la función que devuelve la conexión con la base de datos
const getDb = require('../../db/getDb');

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

        await connection.query(query, queryArgs);
        // Actualizamos el servicio
        // await connection.query(
        //     ` UPDATE entries
        //         SET category = ?, resolved = ?
        //         WHERE id = ?`,
        //     [category, resolved, entryId]
        // );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateEntryModel;
