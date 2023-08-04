// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para crear un nuevo servicio
const insertEntryModel = async (
    name,
    description,
    fileName,
    userId,
    category = 'other'
) => {
    let connection;
    try {
        connection = await getDb();
        // Insertamos entry.
        await connection.query(
            `
            INSERT INTO entries ( name, category, description, fileName, userId) VALUES (?, ?, ?, ?, ?)
        `,
            [name, category, description, fileName, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertEntryModel;
