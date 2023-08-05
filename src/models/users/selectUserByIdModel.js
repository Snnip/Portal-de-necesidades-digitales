// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../../services/errorService');

// Función que realiza una consulta a la base de datos para seleccionar a un usuario con un id.
const selectUserByIdModel = async (userId) => {
    let connection;

    try {
        connection = await getDb();

        // Selecionamos los datos que necesitamos para encryptar el token.
        const [users] = await connection.query(
            `SELECT id, userName, email, biograph, avatar, role, createdAt FROM users WHERE id = ?
            `,
            [userId]
        );

        // El array de usuarios solo debe traer un usuario ya que el id es único. Retornamos el usuario en posición 0.
        return users[0]; // se asegura de que envie el objeto y no [{}]
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdModel;
