// Importamos modelo.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');

// Devuelve el perfil público de un usuario.
const getUserProfileController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Obtenemos datos del usuario.
        const user = await selectUserByIdModel(userId);

        // Borramos datos sensibles antes de enviar a usuario.
        delete user.email;
        // No lanzamos error porque si no mandan Id el modelo tendrá un array = 0 por lo que activará el notFound. Normalmente se lanzan errores de este tipo cuando se obtienen los datos del body, no de req.params o de req.query.

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getUserProfileController;
