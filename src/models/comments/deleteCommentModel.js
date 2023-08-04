const getDb = require('../../db/getDb');

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