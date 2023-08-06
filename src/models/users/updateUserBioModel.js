// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que actualiza una contraseña de un usuario en la base de datos.
const updateUserBioModel = async (biography, userId) => {
    let connection;
    try {
        connection = await getDb();

        // Actualizamos el nombre de usuario en la base de datos
        await connection.query(
            `
            UPDATE users SET biograph = ? WHERE id = ?
        `,
            [biography, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserBioModel;
