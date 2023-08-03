// Importamos la función que devuelve la conexión con la base de datos.
const getDb = require ('../../db/getDb');

// Función que realiza una consulta a la base de datos 
const deleteEntryModel = async (entryId) => {
    let connection;

    try {
        connection = await getDb();
    
        // Eliminamos una entrada
        await connection.query(` DELETE FROM entries WHERE id= ?`,
            [entryId]
        );
    
    } finally{
    
        if (connection) connection.release();
    }

};

module.exports = deleteEntryModel;