// Importamos las dependencias.
const bcrypt = require('bcrypt');

// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Importamos los errores.
const { invalidCredentialsError } = require('../../services/errorService');

// Función que actualiza una contraseña de un usuario en la base de datos.
const updateUserPassModel = async (currentPass, newPass, userId) => {
    let connection;
    try {
        connection = await getDb();

        // Obtenemos contraseña actual del usuario
        const [users] = await connection.query(
            `
            SELECT password FROM users WHERE id = ?
            
        `,
            [userId]
        );

        // Comprobamos si la contraseña vieja coincide con la actual.
        const validPass = await bcrypt.compare(currentPass, users[0].password);

        // Si no coinciden lanzamos error
        if (!validPass) invalidCredentialsError();

        // Encriptamos la contraseña
        const hashedPass = await bcrypt.hash(newPass, 10);

        // Si coinciden actualizamos la contraseña
        await connection.query(
            `
            UPDATE users SET password = ? WHERE id = ?
        `,
            [hashedPass, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserPassModel;
