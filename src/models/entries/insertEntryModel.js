// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const selectEntryByIdModel = require('./selectEntryByIdModel');

// Creamos categorías válidas
const categories = [
    'video-editing',
    'image-editing',
    'document-translation',
    'document-correction',
    'code-correction',
];

// Realiza una consulta a la base de datos para crear un nuevo servicio
const insertEntryModel = async (
    title,
    description,
    fileName,
    userId,
    category
) => {
    let connection;
    try {
        connection = await getDb();

        const queryArgs = [title, description, fileName, userId, category];

        let query = `
        INSERT INTO entries ( title, description, fileName, userId,  category ) VALUES (?, ?, ?, ?, ?)`;

        if (!categories.includes(category)) {
            category = 'other';
            queryArgs.pop();

            query = `
            INSERT INTO entries ( title, description, fileName, userId ) VALUES (?, ?, ?, ?)`;
        }

        // Insertamos servicio.
        const [entry] = await connection.query(query, queryArgs);

        // Seleccionamos los datos de la nueva entrada.

        const newEntry = await selectEntryByIdModel(entry.insertId);

        // Devolvemos los datos de la nueva entrada.
        return newEntry;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertEntryModel;
