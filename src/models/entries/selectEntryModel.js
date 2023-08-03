const getDb = require('../../db/getDb');

const selectEntryModel = async (entryId) => {
    let connection;
    try {
        connection = await getDb();

        const [entries] = await connection.query(
            `SELECT userId FROM entries WHERE id = ?`,
            [entryId]
        );
        return entries[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectEntryModel;
