// Importamos las dependencias.
const getDb = require('../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

// Función controladora intermedia que lanza un error si no existe.
const userExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad no existe, obtenemos el id de los path params.
        const userId = req.user?.id || req.params.userId;

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [userId]
        );

        // Lanzamos un error si el usuario no existe.
        if (users.length < 1) {
            notFoundError('usuario');
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userExists;
