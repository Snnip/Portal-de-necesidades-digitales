const getDb = require('../../db/getDb');

// Función que consulta la base de datos para obtener el listado de comentarios
const selectAllCommentsModel = async (entryId) => {
    let connection;

    try {
        connection = await getDb();

        const [comments] = await connection.query(
            ` 
            SELECT
                C.id AS commentId,
                C.fileName,
                C.content, 
                C.createdAt AS commentCreatedAt,
                U.userName,
                E.name AS entryName
            FROM comments C
            LEFT JOIN users U ON C.userId = U.id
            LEFT JOIN entries E ON C.entryId = E.id
            WHERE C.entryId = ?
        `,
            [entryId]
        );
        return comments;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllCommentsModel;
