// Importamos las dependencias.
const bcrypt = require('bcrypt');

// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que crea un nuevo usuario en la base de datos.
const insertUserModel = async ({ userName, email, password }) => {
    let connection;
    try {
        connection = await getDb();

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
