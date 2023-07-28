// Primero leemos las variables de entorno
require("dotenv").config();

// Accedemos al fichero
const getDb = require("./getDb");

const main = async () => {
  let connection;
  try {
    connection = await getDb();

    console.log("Borrando tablas");

    await connection.query(
      "DROP TABLE IF EXISTS comments, services, users"
    );
    console.log("Creando tablas");

    // Creamos la tabla users
    await connection.query(`CREATE TABLE users (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            biograph TEXT,
            avatar CHAR(40),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
          );`);

    // Creamos la tabla services
    await connection.query(`CREATE TABLE services (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        fileName CHAR(40),
        resolved BOOLEAN DEFAULT FALSE,
        userId INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (userId) REFERENCES users(id)
      );`);

    // Creamos la tabla comments
    await connection.query(`CREATE TABLE comments (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        fileName CHAR(40),
        content TEXT,
        userId INT UNSIGNED NOT NULL,
        serviceId INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (serviceId) REFERENCES services(id)
      );`);

    console.log("¡Tablas creadas!");
  } catch (err) {
    console.error(err);
  } finally {
    // Liberamos la conexión
    if (connection) connection.release();
  }
};

main();