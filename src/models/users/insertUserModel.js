// Importamos las dependencias.
const bcrypt = require('bcrypt');

// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Importamos los errores.
const {
    emailAlreadyRegisteredError,
    userNameAlreadyRegisteredError,
} = require('../../services/errorService');

// Insertar un usuario.

const insertUserModel = async ({ userName, email, password }) => {
    let connection;
    try {
        connection = await getDb();

        // Comprobamos si existe algún usuario con el email establecido.

        let [users] = await connection.query(
            `
            SELECT id FROM users WHERE email = ? 
        `,
            [email]
        );

        // Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }

        // Comprobamos si existe algún usuario con el nombre de usuario establecido.

        [users] = await connection.query(
            `
            SELECT id FROM users WHERE userName = ? 
        `,
            [userName]
        );

        // Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            userNameAlreadyRegisteredError();
        }

        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        // Insertamos al usuario.
        await connection.query(
            `
            INSERT INTO users (userName, email, password) VALUES (?, ?, ?)
        `,
            [userName, email, hashedPass]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserModel;
