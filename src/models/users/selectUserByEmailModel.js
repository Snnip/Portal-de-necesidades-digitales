// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../../services/errorService');

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un email.
const selectUserByEmailModel = async (email) => {
    let connection;

    try {
        connection = await getDb();

        // Comprobamos si existe el usuario.
        // Selecionamos los datos que necesitamos para encryptar el token
        const [users] = await connection.query(
            `SELECT id, userName, password FROM users WHERE email = ?
            `,
            [email]
        );

        // Si no existe el usuario lanzamos error.
        if (users.length === 0) notFoundError('usuario');

        // El array de usuarios solo debe traer un usuario ya que el email es único. Retornamos el usuario en posición 0.
        return users[0]; // se asegura de que envíe el objeto y no [{}]
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByEmailModel;
