// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para eliminar un comentario.
const deleteCommentModel = async (commentId) => {
    let connection;
    try {
        connection = await getDb();

        // Borramos el comentario.
        await connection.query(
            `
            DELETE FROM comments WHERE id= ?
        `,
            [commentId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteCommentModel;
