// Importamos las dependencias.
const getDb = require('../db/getDb');

// Importamos los errores.
const { userNameAlreadyExistsError } = require('../services/errorService');

const userNameExists = async (req, res, next) => {
    let connection;
    try {
        connection = await getDb();

        const { userName } = req.body;

        let [users] = await connection.query(
            `
            SELECT id FROM users WHERE userName = ?
        `,
            [userName]
        );

        // Si existe algún usuario con ese nombre de usuario lanzamos un error.
        if (users.length > 0 && req.userName !== userName) {
            userNameAlreadyExistsError();
        }

        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userNameExists;
