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

| Campo            | Tipo                                     | Descripción                               |
| ---------------- | ---------------------------------------- | ----------------------------------------- |
| id               | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT  | Identificador único del usuario           |
| userName         | VARCHAR(50) UNIQUE NOT NULL              | Nombre del usuario                        |
| email            | VARCHAR(100) UNIQUE NOT NULL             | Correo electrónico del usuario            |
| password         | VARCHAR(100) NOT NULL                    | Contraseña del usuario                    |
| biograph         | TEXT                                     | Biografía del usuario                     |
| avatar           | CHAR(40)                                 | Avatar del usuario (nombre de la foto)    |
| active           | BOOLEAN DEFAULT FALSE                    | Si es un usuario verificado o no (email)  |
| role             | ENUM('admin', 'normal') DEFAULT 'normal' | Rol del usuario (administrador, o normal) |
| registrationCode | VARCHAR(36)                              | Código de registro del usuario            |
| recoverPassCode  | CHAR(10)                                 | Recuperar código de acceso                |
| createdAt        | DATETIME DEFAULT CURRENT_TIMESTAMP       | Fecha y hora de creación del usuario      |
| modifiedAt       | DATETIME ON UPDATE CURRENT_TIMESTAMP     | Fecha de modificación del usuario         |

### entries

| Campo       | Tipo                                                                                                                              | Descripción                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| id          | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT                                                                                           | Identificador único de una entrada         |
| name        | VARCHAR(50)                                                                                                                       | Título de la entrada                       |
| category    | ENUM('video-editing', 'image-editing', 'document-translation', 'document-correction', 'code-correction', 'other') DEFAULT 'other' | Categoría del archivo                      |
| description | TEXT NOT NULL                                                                                                                     | Explicación del servicio que se necesita   |
| fileName    | CHAR(40) NOT NULL                                                                                                                 | Nombre del archivo a resolver (uuid + ext) |
| resolved    | BOOLEAN DEFAULT FALSE                                                                                                             | Estado de resolución de un servicio        |
| userId      | INT UNSIGNED NOT NULL                                                                                                             | Identificador del usuario creador          |
| createdAt   | DATETIME DEFAULT CURRENT_TIMESTAMP                                                                                                | Fecha y hora de creación del usuario       |
| FOREIGN KEY | (userId) REFERENCES users(id)                                                                                                     | Llave foranea                              |

### comments

| Campo       | Tipo                                    | Descripción                              |
| ----------- | --------------------------------------- | ---------------------------------------- |
| id          | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT | Identificador único del usuario          |
| fileName    | CHAR(40)                                | Nombre de archivo terminado (uuid + ext) |
| content     | TEXT                                    | Texto de commentario                     |
| userId      | INT UNSIGNED NOT NULL                   | Identificador del usuario creador        |
| entryId     | INT UNSIGNED NOT NULL                   | Identificador de la entrada creada       |
| createdAt   | DATETIME DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación de comentarios  |
| FOREIGN KEY | (userId) REFERENCES users(id)           | Llave foranea                            |
| FOREIGN KEY | (serviceId) REFERENCES services(id)     | Llave foranea                            |

------------Endpoints Will----------------------

## Endpoints del users ✅

-   **POST** - [`/users`] - Crea un nuevo usuario.(Falta Joi) ✅
-   **POST** - [`/users/login`] - Logea a un usuario retornando un token. (Falta Joi) ✅
-   **GET** - [`/users/:userId`] - Retorna información pública de un usuario (ver el perfil). ✅
-   **GET** - [`/users`] - Retorna información privada del usuario con el id del token. ➡️ `Token` ✅
-   **PUT** - [`/users/avatar`] - Permite actualizar el avatar del usuario. ➡️ `Token` ✅

======================================================================================================

-   **POST** - [`/users/password/recover`] - Envía al usuario un correo de recuperación de contraseña.(Opcional al acabar el proyecto)
-   **PUT** - [`/users/password/reset`] - Actualiza la contraseña de un usuario mediante un código de recuperación.(Opcional al acabar el proyecto) ➡️ `Token`

## Endpoints de entries

-   _GET_ - [`/entries`] - Retorna el listado de servicios. (join tabla de usuarios -para sacar el email y nombre de usuario-,numero de comentarios) con query params hacer filtros (resueltos, no resueltos y por categorias (videos, traduccion...))
    Gestionar con query params:
    /entries devuelve todos los servicios
    /entries?resolved=false todos los servicios no resueltos
    /entries?resolved=false&category=video-editing todos los servicios de video editing no resueltos
    Siempre devolveria los servicios ordenados por fecha des ✅

-   _GET_ - [`/entries/:entryId`] - Retorna un servicio en concreto. ➡️ `Token`
-   _POST_ - [`/entries`] - Crea un nuevo servicio. ➡️ `Token` (Casi terminado)✅
-   _PUT_ - [`/entries/:entryId`] - Actualizar un servicio. ➡️ `Token`(posibilidad de ponerlo como resuelto)✅
-   _DELETE_ - [`/entries/:entryId`] - Eliminar un servicio en concreto. ➡️ `Token` ✅

## Endpoints de comments

-   _GET_ - [`/comments/:serviceId`] - Retorna todos los comentarios de un servicio en concreto. ➡️ `Token`
    //- _GET_ - [`/comments/:commentId`] - Retorna un comentario en concreto. ➡️ `Token`//no es necesario
-   _POST_ - [`/comments/:serviceId`] - Crea un nuevo comentario con la posibilidad de añadir un archivo. ➡️ `Token`
    //- _POST_ - [`/comments/:commentId/files`] - Agregar un archivo a una comentario. ➡️ `Token`// no es necesario
-   _DELETE_ - [`/comments/:commentId`] - Eliminar un comentario de una entrada incluido el archivo. ➡️ `Token`
-   _DELETE_ - [`/comments/:commentId/files`] - Eliminar un archivo de un comentario de una entrada. ➡️ `Token`//no es necesario
