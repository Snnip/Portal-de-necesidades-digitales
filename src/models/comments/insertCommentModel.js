// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para agregar un nuevo comentario.
const insertCommentModel = async (content, userId, entryId, fileName) => {
    let connection;
    try {
        connection = await getDb();

        // Insertamos el comentario.
        const [comment] = await connection.query(
            `
            INSERT INTO comments ( content, userId, entryId, fileName ) VALUES ( ?, ?, ?, ?)
        `,
            [content, userId, entryId, fileName]
        );

        // Retornamos el id asignado por la base de datos.
        return comment.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertCommentModel;
