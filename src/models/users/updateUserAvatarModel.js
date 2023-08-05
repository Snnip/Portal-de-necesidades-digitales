// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const updateUserAvatarModel = async (avatarName, userId) => {
    let connection;
    try {
        connection = await getDb();

        // Actualizamos el avatar
        await connection.query(
            `
            UPDATE users SET avatar = ? WHERE id = ?
        `,
            [avatarName, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserAvatarModel;
