// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const selectUserByIdModel = require('./selectUserByIdModel');

// Función que realiza una consulta a la base de datos para actualizar los datos de usuario.
const updateUserModel = async (avatarName, biography, userName, userId) => {
    let connection;
    try {
        connection = await getDb();

        // Actualizamos el usuario
        await connection.query(
            `
            UPDATE users SET avatar = ?, biograph = ?, userName = ? WHERE id = ?
        `,
            [avatarName, biography, userName, userId]
        );

        // Seleccionamos los datos del usuario actualizado.
        const updatedUser = await selectUserByIdModel(userId);

        // Retornamos los datos del usuario actualizado.
        return updatedUser;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserModel;
