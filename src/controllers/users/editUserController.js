// Importamos modelos.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');
const updateUserModel = require('../../models/users/updateUserModel');

// Importamos los servicios.
const deleteFileService = require('../../services/deleteFileService');
const saveAvatarService = require('../../services/saveAvatarService');
const validateSchemaService = require('../../services/validateSchemaService');
const updateUserSchema = require('../../schemas/users/updateUserSchema');

// Actualiza el avatar de un usuario.
const editUserController = async (req, res, next) => {
    try {
        // Validamos la biografía y el userName del usuario.
        await validateSchemaService(updateUserSchema, req.body);

        // Obtenemos datos del usuario usando token.
        const user = await selectUserByIdModel(req.user.id);

        // Eliminamos avatar anterior si existe.
        if (user.avatar && req.files?.avatar) {
            await deleteFileService(user.avatar);
        }

        let avatarName = user.avatar;

        if (req.files?.avatar) {
            // Guardamos el avatar en la carpeta. Redimensionamos ancho.
            avatarName = await saveAvatarService(req.files.avatar, 100);
        }

        console.log(avatarName);
        // Actualizamos los datos del usuario.
        const updatedUser = await updateUserModel(
            avatarName,
            req.body.biography,
            req.body.userName,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: { updatedUser },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserController;
