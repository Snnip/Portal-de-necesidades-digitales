// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que consulta la base de datos para obtener el listado de comentarios.
const selectAllCommentsModel = async (entryId) => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el listado de comentarios.
        const [comments] = await connection.query(
            ` 
            SELECT
                C.id AS commentId,
                C.fileName,
                C.content, 
                C.createdAt AS commentCreatedAt,
                U.id AS userId,
                U.userName,
                E.title AS entryName
            FROM comments C
            LEFT JOIN users U ON C.userId = U.id
            LEFT JOIN entries E ON C.entryId = E.id
            WHERE C.entryId = ?
        `,
            [entryId]
        );

        // Retornamos los comentarios.
        return comments;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllCommentsModel;
