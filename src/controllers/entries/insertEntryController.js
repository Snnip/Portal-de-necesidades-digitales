// Importamos modelos.
const insertEntryModel = require('../../models/entries/insertEntryModel');

// Importamos los errores,
const { missingFieldsError } = require('../../services/errorService');

// Importamos los servicios.
const saveFileService = require('../../services/saveFileService');

// Importamos esquemas.
const insertEntrySchema = require('../../schemas/entries/insertEntrySchema');

const validateSchemaService = require('../../services/validateSchemaService');

const insertEntryController = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;

        if (!req.files?.file) missingFieldsError();

        // Validamos datos con esquema de Joi.
        await validateSchemaService(
            insertEntrySchema,
            Object.assign(req.body, req.files)
        );
        const { file } = req.files;

        // Obtenemos datos del usuario usando token.
        const userId = req.user.id;

        // Guardamos el archivo en la carpeta.
        const fileName = await saveFileService(file);

        // Insertamos servicio y obtenemos su id.
        const entry = await insertEntryModel(
            title,
            description,
            fileName,
            userId,
            category
        );

        // Devolveremos datos útiles para el front.
        res.send({
            status: 'ok',
            data: {
                entry,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = insertEntryController;
