# Portal de necesidades digitales.

-   API que permite gestionar una web donde personas que necesiten algún servicio digital puedan pedir ayuda a otros usuarios.

-- Ejemplo: traducir un texto, editar una foto, revisar un documento, etc… Solo necesidades que puedan realizarse mediante un fichero digital.

# Tecnologías utilizadas

1. Para la API

    - NodeJs
    - Express

2. Para la base de datos

    - Mysql

3. Para el testing

    - Postman

# Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

5. Utilizar Postman para testing. Colección incluida en repo.

## portal_de_necesidades. Estructura base de datos.

### users

| Campo            | Tipo                                     | Descripción                               |
| ---------------- | ---------------------------------------- | ----------------------------------------- |
| id               | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT  | Identificador único del usuario           |
| userName         | VARCHAR(50) UNIQUE NOT NULL              | Nombre del usuario                        |
| email            | VARCHAR(100) UNIQUE NOT NULL             | Correo electrónico del usuario            |
| password         | VARCHAR(100) NOT NULL                    | Contraseña del usuario                    |
| authModifiedAt   | BIGINT UNSIGNED                          | Fecha de modificación de la contraseña    |
| biograph         | TEXT                                     | Biografía del usuario                     |
| avatar           | CHAR(50)                                 | Avatar del usuario (nombre de la foto)    |
| active           | BOOLEAN DEFAULT FALSE                    | Si es un usuario verificado o no (email)  |
| role             | ENUM('admin', 'normal') DEFAULT 'normal' | Rol del usuario (administrador, o normal) |
| registrationCode | VARCHAR(30)                              | Código de registro del usuario            |
| recoverPassCode  | CHAR(10)                                 | Recuperar código de acceso                |
| createdAt        | DATETIME DEFAULT CURRENT_TIMESTAMP       | Fecha y hora de creación del usuario      |
| modifiedAt       | DATETIME ON UPDATE CURRENT_TIMESTAMP     | Fecha de modificación del usuario         |

### entries

| Campo       | Tipo                                                                                                                              | Descripción                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| id          | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT                                                                                           | Identificador único de una entrada         |
| title       | VARCHAR(50)                                                                                                                       | Título de la entrada                       |
| category    | ENUM('video-editing', 'image-editing', 'document-translation', 'document-correction', 'code-correction', 'other') DEFAULT 'other' | Categoría del archivo                      |
| description | TEXT NOT NULL                                                                                                                     | Explicación del servicio que se necesita   |
| fileName    | CHAR(50) NOT NULL                                                                                                                 | Nombre del archivo a resolver (uuid + ext) |
| resolved    | BOOLEAN DEFAULT FALSE                                                                                                             | Estado de resolución de un servicio        |
| userId      | INT UNSIGNED NOT NULL                                                                                                             | Identificador del usuario creador          |
| createdAt   | DATETIME DEFAULT CURRENT_TIMESTAMP                                                                                                | Fecha y hora de creación del usuario       |
| modifiedAt  | DATETIME ON UPDATE CURRENT_TIMESTAMP                                                                                              | Fecha de modificación del usuario          |
| FOREIGN KEY | (userId) REFERENCES users(id)                                                                                                     | Llave foránea                              |

### comments

| Campo       | Tipo                                    | Descripción                              |
| ----------- | --------------------------------------- | ---------------------------------------- |
| id          | INT UNSIGNED PRIMARY KEY AUTO_INCREMENT | Identificador único del usuario          |
| fileName    | CHAR(50)                                | Nombre de archivo terminado (uuid + ext) |
| content     | TEXT                                    | Texto de comentario                      |
| userId      | INT UNSIGNED NOT NULL                   | Identificador del usuario creador        |
| entryId     | INT UNSIGNED NOT NULL                   | Identificador de la entrada creada       |
| createdAt   | DATETIME DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación de comentarios  |
| FOREIGN KEY | (userId) REFERENCES users(id)           | Llave foránea                            |
| FOREIGN KEY | (serviceId) REFERENCES services(id)     | Llave foránea                            |

## Endpoints de users

-   **POST** - [`/users`] - Crea un nuevo usuario. ✅✅
-   **POST** - [`/users/login`] - Loguea a un usuario retornando un token. ✅✅
-   **GET** - [`/users/:userId`] - Retorna información pública de un usuario (ver el perfil). ✅✅
-   **GET** - [`/users/info`] - Retorna información privada del usuario con el id del token. ➡️ `Token` ✅✅
-   **PUT** - [`/users/avatar`] - Permite actualizar el avatar del usuario. ➡️ `Token` ✅✅
-   **PUT** - [`/users/password`] - Permite actualizar la contraseña del usuario. ➡️ `Token` ✅✅
-   **PUT** - [`/users/biography`] - Permite actualizar la biografía del usuario. ➡️ `Token` ✅✅
-   **PUT** - [`/users/userName`] - Permite actualizar el nombre de usuario. ➡️ `Token` ✅✅

## Endpoints de services

-   **GET** - [`/entries`] - Retorna el listado de servicios. (join tabla de usuarios -para sacar el email y nombre de usuario-,numero de comentarios) con query params hacer filtros (resueltos, no resueltos y por categorias (videos, traduccion...))
    Gestionar con query params:
    /entries devuelve todos los servicios
    /entries?resolved=false todos los servicios no resueltos
    /entries?resolved=false&category=video-editing todos los servicios de video editing no resueltos.
    Siempre devolvería los servicios ordenados por fecha des ✅✅

-   **GET** - [`/entries/:entryId`] - Retorna un servicio. ✅✅
-   **POST** - [`/entries`] - Crea un nuevo servicio. ➡️ `Token` ✅✅
-   **PUT** - [`/entries/:entryId`] - Actualizar un servicio. ➡️ `Token` ✅✅
-   **DELETE** - [`/entries/:entryId`] - Eliminar un servicio. ➡️ `Token` ✅✅

## Endpoints de comments

-   **GET** - [`/comments/:serviceId`] - Retorna todos los comentarios de un servicio. ➡️ `Token` ✅✅
-   **POST** - [`/comments/:serviceId`] - Crea un nuevo comentario con la posibilidad de añadir un archivo. ➡️ `Token` ✅✅
-   **DELETE** - [`/comments/:commentId`] - Eliminar un comentario de una entrada incluido el archivo. ➡️ `Token` ✅✅
