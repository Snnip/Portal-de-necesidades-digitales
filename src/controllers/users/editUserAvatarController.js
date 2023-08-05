// Importamos modelos
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');
const updateUserAvatarModel = require('../../models/users/updateUserAvatarModel');

// Importamos errores
const { missingFieldsError } = require('../../services/errorService');

// Importamos servicios
const deleteFileService = require('../../services/deleteFileService');
const saveAvatarService = require('../../services/saveAvatarService');

// Actualiza el avatar de un usuario.
const editUserAvatarController = async (req, res, next) => {
    try {
        // Comprobamos que hayan mandado archivo
        if (!req.files?.avatar) missingFieldsError();

        // Obtenemos datos del usuario usando token
        const user = await selectUserByIdModel(req.user.id);

        // Eliminamos avatar anterior si existe
        if (user.avatar) {
            await deleteFileService(user.avatar);
        }
        // Guardamos el avatar en la carpeta. Redimensionamos ancho
        const avatarName = await saveAvatarService(req.files.avatar, 100);

        // Actualizamos el avatar
        await updateUserAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserAvatarController;
