// Importamos la base de datos
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para obtener información de una entrada concreta.
const selectEntryByIdModel = async (entryId) => {
    let connection;

    try {
        connection = await getDb();

        // Selecionamos los datos que necesitamos.
        const [entries] = await connection.query(
            `SELECT e.id, e.title, e.category, e.description, e.fileName, e.resolved, e.userId, u.userName, e.createdAt FROM entries e
            INNER JOIN users u ON e.userId = u.id
            `,
            [entryId]
        );

        // El array de entries solo debe traer un entry ya que el id es único. Retornamos el entry en posición 0.
        return entries[0]; // se asegura de que envíe el objeto y no [{}]
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectEntryByIdModel;
