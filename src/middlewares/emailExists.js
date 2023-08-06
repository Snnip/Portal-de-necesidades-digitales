const getDb = require('../db/getDb');

// Importamos los errores.
const { emailAlreadyRegisteredError } = require('../services/errorService');

const emailExists = async (req, res, next) => {
    let connection;
    try {
        connection = await getDb();

        const { email } = req.body;

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

        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = emailExists;
