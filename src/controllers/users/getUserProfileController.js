// Importamos modelo
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');

const getUserProfileController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Obtenemos datos del usuario
        const user = await selectUserByIdModel(userId);

        // Borramos datos sensibles antes de enviar a usuario
        delete user.email;
        // No lanzamos error porque si no mandan Id el modelo tendra un array = 0 por lo que activara el notFound. Normalmente se lanzan erroresde este tipo cuando se obtienen los datos del body, no de req.params o de req.query

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
