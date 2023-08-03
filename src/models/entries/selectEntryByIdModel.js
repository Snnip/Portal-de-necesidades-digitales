// Importamos la base de datos
const getDb = require('../../db/getDb');

const selectEntryByIdModel = async (entryId) => {
    let connection;

    try {
        connection = await getDb();

        // Selecionamos los datos que necesitamos.
        const [entries] = await connection.query(
            `SELECT id, category, resolved, fileName , userId FROM entries WHERE id = ?
            `,
            [entryId]
        );

        // El array de entries solo debe traer un entry ya que el id es unico. Retornamos el entry en posicion 0.
        return entries[0]; // se asegura de que envie el objeto y no [{}]
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectEntryByIdModel;
