// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Importamos los errores.
const { serviceAlreadyPublishedError } = require('../../services/errorService');

// Insertar un usuario.

const insertServiceModel = async ({ name, description, fileName, userId }) => {
    let connection;
    try {
        connection = await getDb();

        // Insertamos el servicio.
        await connection.query(
            `
            INSERT INTO servicess (name, description, fileName, userId) VALUES (?, ?, ?, ?)
        `,
            [name, description, fileName, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertServiceModel;
