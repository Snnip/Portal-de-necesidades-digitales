// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que consulta la base de datos para obtener el listado de entradas.
const selectAllEntriesModel = async (category = '', resolved = '') => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos la información necesaria de la entrada.
        const [entries] = await connection.query(
            `
            SELECT e.name, e.category, e.description, e.fileName, e.resolved, u.userName, COUNT(c.id) AS numberOfComments, e.createdAt FROM entries e
            JOIN users u ON e.userId = u.id
            LEFT JOIN comments c ON e.id = c.entryId
            WHERE e.category LIKE ? AND e.resolved LIKE ? 
            GROUP BY e.id
            ORDER BY e.createdAt DESC;
        `,
            [`%${category}%`, `%${resolved}%`]
        );
        return entries;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllEntriesModel;
