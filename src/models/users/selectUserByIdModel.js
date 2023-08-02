// Importamos la base de datos
const getDb = require('../../db/getDb');
const { notFoundError } = require('../../services/errorService');

const selectUserByIdModel = async (userId) => {
    let connection;

    try {
        connection = await getDb();

        // Comprobamos si existe el usuario.
        // Selecionamos los datos que necesitamos para encryptar el token
        const [users] = await connection.query(
            `SELECT id, userName, email, biograph, avatar, createdAt FROM users WHERE id = ?
            `,
            [userId]
        );

        // El array de usuarios solo debe traer un usuario ya que el id es unico. Retornamos el usuario en posicion 0.
        return users[0]; // se asegura de que envie el objeto y no [{}]
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdModel;
