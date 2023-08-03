// Importamos la base de datos
const getDb = require('../../db/getDb');

const selectEntryByIdModel = async (entryId) => {
    let connection;

    try {
        connection = await getDb();

        // Selecionamos los datos que necesitamos.
        const [entries] = await connection.query(
            `SELECT id, category, resolved FROM entries WHERE id = ?
            `,
            [entryId]
        );

        // El array de entriess solo debe traer un uentry ya que el id es unico. Retornamos el entry en posicion 0.
        return entries[0]; // se asegura de que envie el objeto y no [{}]
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectEntryByIdModel;
