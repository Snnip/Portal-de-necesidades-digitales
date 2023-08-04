const getDb = require('../../db/getDb');

const insertCommentModel = async (
    content,
    userId,
    entryId,
    fileName,
) => {
    let connection;
    try{
        connection = await getDb();

        // Insertamos comment.
        await connection.query(
            `
            INSERT INTO comments ( content, userId, entryId, fileName ) VALUES ( ?, ?, ?, ?)
        `,
            [content, userId, entryId, fileName]
        );
    
    } finally{
        if (connection) connection.release();
    }
};

module.exports = insertCommentModel;