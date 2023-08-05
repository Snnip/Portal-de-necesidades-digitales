// Importamos la dependencia mysql2.
const mysql = require('mysql2/promise');

// Importamos las variables globales.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable donde guardamos el array de conexiones.
let pool;

// Función que crea la base de datos si no existe.
const getDb = async () => {
    try {
        // Si no existe un array de conexiones.
        if (!pool) {
            // Creamos una conexión con la base de datos. Este proceso permite crear una base de datos de manera automática si no existe.
            const connection = await mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });
            // Creamos la base de datos si no existe.
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            // Creamos un grupo de conexiones.
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }
        // Liberamos la conexión.
        return await pool.getConnection();
    } catch (err) {
        console.error(err);
    }
};

// Exportamos la función.
module.exports = getDb;
