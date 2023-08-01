const getDb = require('../../db/getDb');

const sampleModel = async (params, a, pedir) => {
    let connection;
    try {
        connection = await getDb();
    } finally {
        if (connection) connection.release();
    }
};

module.exports = sampleModel;
