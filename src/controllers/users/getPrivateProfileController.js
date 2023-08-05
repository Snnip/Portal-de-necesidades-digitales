// Importamos modelo
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');

// Devuelve el perfil privado de un usuario
const getPrivateProfileController = async (req, res, next) => {
    try {
        // Obtenemos datos del usuario
        const user = await selectUserByIdModel(req.user.id);

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

module.exports = getPrivateProfileController;
