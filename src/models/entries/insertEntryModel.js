// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Realiza una consulta a la base de datos para crear un nuevo servicio
const insertEntryModel = async (
    title,
    description,
    fileName,
    userId,
    category = 'other'
) => {
    let connection;
    try {
        connection = await getDb();

        // Insertamos servicio.
        const [entry] = await connection.query(
            `
            INSERT INTO entries ( title, description, fileName, userId,  category ) VALUES (?, ?, ?, ?, ?)
        `,
            [title, description, fileName, userId, category]
        );

        // Devolvemos el id que le asigna la base de datos a la entrada.
        return entry.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertEntryModel;
