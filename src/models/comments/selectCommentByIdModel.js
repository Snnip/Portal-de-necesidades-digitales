// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para obtener un comentario concreto.
const selectCommentByIdModel = async (commentId) => {
    let connection;

    try {
        connection = await getDb();

        // Selecionamos los datos que necesitamos.
        const [comments] = await connection.query(
            `SELECT id, fileName, userId FROM comments WHERE id = ?
            `,
            [commentId]
        );

        // El array de comments solo debe traer un comment ya que el id es único. Retornamos el comment en posición 0.
        return comments[0]; // se asegura de que envíe el objeto y no [{}]
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectCommentByIdModel;
