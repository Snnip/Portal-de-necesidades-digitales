// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../db/getDb');

// Función que realiza una consulta a la base de datos para
const sampleModel = async (params, a, pedir) => {
    let connection;
    try {
        connection = await getDb();
    } finally {
        if (connection) connection.release();
    }
};

module.exports = sampleModel;
