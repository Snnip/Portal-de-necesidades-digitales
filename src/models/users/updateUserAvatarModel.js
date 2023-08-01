const getDb = require('../../db/getDb');

const updateUserAvatarModel = async (avatarName, userId) => {
    let connection;
    try {
        connection = await getDb();

        // Actualizamos el avatar
        await connection.query(
            `
            UPDATE users SET avatar = ? WHERE id = ?
        `,
            [avatarName, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserAvatarModel;
