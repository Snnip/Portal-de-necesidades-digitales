// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

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

        // Devolvemos el id que le asigna la base de datos a la entrada.
        return {
            entryId: entry.insertId,
            assignedCategory: category,
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertEntryModel;
