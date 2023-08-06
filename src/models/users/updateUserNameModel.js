// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que actualiza una contraseña de un usuario en la base de datos.
const updateUserNameModel = async (userName, userId) => {
    let connection;
    try {
        connection = await getDb();

        // Actualizamos el nombre de usuario en la base de datos
        await connection.query(
            `
            UPDATE users SET userName = ? WHERE id = ?
        `,
            [userName, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserNameModel;
