# Portal de necesidades digitales.

Se trata de una API que permita gestionar una web donde personas que necesiten algún servicio digital puedan pedir ayuda a otros usuarios (estilo Fiverr). Por ejemplo: traducir un texto, editar una foto, revisar un documento, etc… Solo necesidades que puedan realizarse
mediante un fichero digital.

# Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### users

| Campo      | Tipo                                    | Descripción                            |
| ---------- | --------------------------------------- | -------------------------------------- |
| id         | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT | Identificador único del usuario        |
| firstName  | VARCHAR(50) NOT NULL                    | Nombre del usuario                     |
| lastName   | VARCHAR(100) NOT NULL                   | Apellido del usuario                   |
| email      | VARCHAR(100) NOT NULL UNIQUE            | Correo electrónico del usuario         |
| password   | VARCHAR(100) NOT NULL                   | Contraseña del usuario                 |
| biograph   | TEXT                                    | Biografía del usuario                  |
| avatar     | CHAR(40)                                | Avatar del usuario (nombre de la foto) |
| createdAt  | DATETIME DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación del usuario   |
| modifiedAt | DATETIME ON UPDATE CURRENT_TIMESTAMP    | Fecha de modificación del usuario      |

### services

| Campo           | Tipo                                    | Descripción                           |
| --------------- | --------------------------------------- | ------------------------------------- |
| id              | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT | Identificador único del usuario       |
| servicesName    | VARCHAR(200)                            | Título del servicio                   |
| description     | TEXT                                    | Explicación del servicio ofrecido     |
| file            | VARCHAR(255)                            | Ruta                                  |
| serviceResolved | BOOLEAN DEFAULT FALSE                   | Estado de resolución de un servicio   |
| serviceTaken    | BOOLEAN DEFAULT FALSE                   | Si se está trabajando en ese servicio |
| userId          | INT UNSIGNED NOT NULL                   | Identificador del usuario creador     |
| createdAt       | DATETIME DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación del usuario  |
| FOREIGN KEY     | (userId) REFERENCES users(id)           | Llave foranea                         |

### comments

| Campo       | Tipo                                    | Descripción                             |
| ----------- | --------------------------------------- | --------------------------------------- |
| id          | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT | Identificador único del usuario         |
| content     | VARCHAR(100)                            | Contenido                               |
| userId      | INT UNSIGNED NOT NULL                   | Identificador del usuario creador       |
| serviceId   | INT UNSIGNED NOT NULL                   | Identificador del servicio creado       |
| createdAt   | DATETIME DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación de comentarios |
| FOREIGN KEY | (userId) REFERENCES users(id)           | Llave foranea                           |
| FOREIGN KEY | (serviceId) REFERENCES services(id)     | Llave foranea                           |

### workingOn

| Campo       | Tipo                                    | Descripción                             |
| ----------- | --------------------------------------- | --------------------------------------- |
| id          | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT | Identificador único del usuario         |
| userId      | INT UNSIGNED NOT NULL                   | Identificador del usuario creador       |
| serviceId   | INT UNSIGNED NOT NULL                   | Identificador del servicio creado       |
| createdAt   | DATETIME DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación de comentarios |
| FOREIGN KEY | (userId) REFERENCES users(id)           | Llave foranea                           |
| FOREIGN KEY | (serviceId) REFERENCES services(id)     | Llave foranea                           |

## Endpoints

POST - [`/users/resgister`] - Crea un nuevo usuario.
POST - [`/users/login`] - Logea a un usuario.
POST - [`/users/:user_id/services`] - Crea un nuevo servicio requerido por el usuario.
POST - [`/services/:service_id/comments`] - Crea un nuevo comentario en un servicio.

GET - [`/users/:user_id`] - Retorna información del usuario.
GET - [`/users/:user_id/services`] - Retorna información de los servicios creados por un usuario.
GET - [`/services/:service_id`] - Retorna información de un servicio específico.
GET - [`/services/:service_id/comments`] - Retorna información de todos los comentarios de un servicio.

PUT - [/users/:user_id] - Actualiza la información de un usuario.
PUT - [/users/password] - Actualiza la contraseña de un usuario.
PUT - [`/services/:service_id`] - Actualiza la información de un servicio específico.

DELETE - [`/users/:user_id`] - Elimina un usuario.
DELETE - [`/services/:service_id`] - Elimina un servicio específico.
