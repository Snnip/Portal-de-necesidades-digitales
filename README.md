# Portal de necesidades digitales.

-   API que permite gestionar una web donde personas que necesiten algún servicio digital puedan pedir ayuda a otros usuarios.

-- Ejemplo: traducir un texto, editar una foto, revisar un documento, etc… Solo necesidades que puedan realizarse mediante un fichero digital.

# Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## portal_de_necesidades

### users

| Campo      | Tipo                                    | Descripción                            |
| ---------- | --------------------------------------- | -------------------------------------- |
| id         | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT | Identificador único del usuario        |
| userName   | VARCHAR(50) UNIQUE NOT NULL             | Nombre del usuario                     |
| email      | VARCHAR(100) UNIQUE NOT NULL            | Correo electrónico del usuario         |
| password   | VARCHAR(100) NOT NULL                   | Contraseña del usuario                 |
| biography  | TEXT                                    | Biografía del usuario                  |
| avatar     | CHAR(40)                                | Avatar del usuario (nombre de la foto) |
| createdAt  | DATETIME DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación del usuario   |
| modifiedAt | DATETIME ON UPDATE CURRENT_TIMESTAMP    | Fecha de modificación del usuario      |

### services

| Campo       | Tipo                                    | Descripción                                |
| ----------- | --------------------------------------- | ------------------------------------------ |
| id          | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT | Identificador único del servicio           |
| name        | VARCHAR(50) NOT NULL                    | Título del servicio                        |
| description | TEXT NOT NULL                           | Explicación del servicio que se necesita   |
| fileName    | CHAR(40) NOT NULL                       | Nombre del archivo a resolver (uuid + ext) |
| resolved    | BOOLEAN DEFAULT FALSE                   | Estado de resolución de un servicio        |
| userId      | INT UNSIGNED NOT NULL                   | Identificador del usuario creador          |
| createdAt   | DATETIME DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación del usuario       |
| FOREIGN KEY | (userId) REFERENCES users(id)           | Llave foranea                              |

### comments

| Campo       | Tipo                                    | Descripción                              |
| ----------- | --------------------------------------- | ---------------------------------------- |
| id          | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT | Identificador único del usuario          |
| fileName    | CHAR(40)                                | Nombre de archivo terminado (uuid + ext) |
| content     | TEXT                                    | Texto de commentario                     |
| userId      | INT UNSIGNED NOT NULL                   | Identificador del usuario creador        |
| serviceId   | INT UNSIGNED NOT NULL                   | Identificador del servicio creado        |
| createdAt   | DATETIME DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación de comentarios  |
| FOREIGN KEY | (userId) REFERENCES users(id)           | Llave foranea                            |
| FOREIGN KEY | (serviceId) REFERENCES services(id)     | Llave foranea                            |

## Endpoints ✅

POST - [`/users/register`] - Crea un nuevo usuario.
POST - [`/users/login`] - Logea a un usuario retornando un token.
POST - [`/users/:user_id/services`] - Crea un nuevo servicio requerido por el usuario.
POST - [`/services/:service_id/comments`] - Crea un nuevo comentario en un servicio.

GET - [`/users/services`] - Retorna los servicios existentes.
GET - [`/users/:user_id`] - Retorna información pública de un usuario (ver el perfil).
GET - [`/users/:user_id/services`] - Retorna información de los servicios creados por un usuario.
GET - [`/services/:service_id`] - Retorna información de un servicio específico.
GET - [`/services/:service_id/comments`] - Retorna información de todos los comentarios de un servicio.

PUT - [/users/:user_id] - Actualiza la información de un usuario.
PUT - [/users/password] - Actualiza la contraseña de un usuario.
PUT - [`/services/:service_id`] - Actualiza la información de un servicio específico.

DELETE - [`/users/:user_id`] - Elimina un usuario.
DELETE - [`/services/:service_id`] - Elimina un servicio específico.

------------Endpoints Will----------------------

## Endpoints del usuario ✅

-   **POST** - [`/users`] - Crea un nuevo usuario.(Falta Joi) ✅
-   **POST** - [`/users/login`] - Logea a un usuario retornando un token. (Falta Joi) ✅
-   **GET** - [`/users/:userId`] - Retorna información pública de un usuario (ver el perfil). ✅
-   **GET** - [`/users`] - Retorna información privada del usuario con el id del token. ➡️ `Token` ✅
-   **PUT** - [`/users/avatar`] - Permite actualizar el avatar del usuario. ➡️ `Token` ✅

===============================================

-   **POST** - [`/users/password/recover`] - Envía al usuario un correo de recuperación de contraseña.(Opcional al acabar el proyecto)
-   **PUT** - [`/users/password/reset`] - Actualiza la contraseña de un usuario mediante un código de recuperación.(Opcional al acabar el proyecto) ➡️ `Token`

## Endpoints de servicios

-   **GET** - [`/services`] - Retorna el listado de servicios.
-   **GET** - [`/services/:serviceId`] - Retorna un servicio en concreto. ➡️ `Token`
-   **POST** - [`/services`] - Crea un nuevo servicio. ➡️ `Token`
-   **PUT** - [`/services/:serviceId`] - Actualizar una servicio. ➡️ `Token`
-   **DELETE** - [`/services/:serviceId`] - Eliminar un servicio en concreto. ➡️ `Token`

## Endpoints de comentarios

-   **GET** - [`/comments/:serviceId`] - Retorna todos los comentarios de un servicio en concreto. ➡️ `Token`
-   **GET** - [`/comments/:commentId`] - Retorna un comentario en concreto. ➡️ `Token`
-   **POST** - [`/comments`] - Crea un nuevo comentario. ➡️ `Token`
-   **POST** - [`/comments/:commentId/files`] - Agregar un archivo a una comentario. ➡️ `Token`
-   **DELETE** - [`/comments/:commentId`] - Eliminar un comentario de una entrada. ➡️ `Token`
-   **DELETE** - [`/comments/:commentId/files`] - Eliminar un archivo de un comentario de una entrada. ➡️ `Token`
