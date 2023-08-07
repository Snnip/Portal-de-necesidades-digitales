// Leemos las variables de entorno.
require('dotenv').config();

// Accedemos al fichero.
const getDb = require('./getDb');

const main = async () => {
    let connection;
    try {
        connection = await getDb();

        console.log('Borrando tablas');

        await connection.query('DROP TABLE IF EXISTS comments, entries, users');
        console.log('Creando tablas');

        // Creamos la tabla users.
        await connection.query(`
          CREATE TABLE users (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              userName VARCHAR(50) UNIQUE NOT NULL,
              email VARCHAR(100) NOT NULL UNIQUE,
              password VARCHAR(100) NOT NULL,
              authModifiedAt BIGINT UNSIGNED,
              biograph TEXT,
              avatar CHAR(50),
              active BOOLEAN DEFAULT FALSE,
              role ENUM('admin', 'normal') DEFAULT 'normal',
              registrationCode CHAR(30),
              recoverPassCode CHAR(10),
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
          );
      `);

        // Creamos la tabla entries.
        await connection.query(`
          CREATE TABLE entries (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              title VARCHAR(50),
              category ENUM('video-editing', 'image-editing', 'document-translation', 'document-correction', 'code-correction', 'other') DEFAULT 'other',
              description TEXT NOT NULL,
              fileName CHAR(50) NOT NULL,
              resolved BOOLEAN DEFAULT FALSE,
              userId INT UNSIGNED NOT NULL,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, 
              FOREIGN KEY (userId) REFERENCES users(id)
          );
      `);

        // Creamos la tabla comments.
        await connection.query(`
          CREATE TABLE comments (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              fileName CHAR(50),
              content TEXT NOT NULL,
              userId INT UNSIGNED NOT NULL,
              entryId INT UNSIGNED NOT NULL,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
              FOREIGN KEY (userId) REFERENCES users(id),
              FOREIGN KEY (entryId) REFERENCES entries(id)
          );
      `);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        // Liberamos la conexión.
        if (connection) connection.release();
        // Cerramos proceso de manera automática.
        process.exit();
    }
};

main();
