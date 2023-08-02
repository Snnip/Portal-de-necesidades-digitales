// Importamos errores
const { missingFieldsError } = require('../../services/errorService');

// Importamos modelos
const insertEntryModel = require('../../models/entries/insertEntryModel');
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');

// Importamos servicios
const saveFileService = require('../../services/saveFileService');

// Importamos esquemas
const insertEntrySchema = require('../../schemas/entries/insertEntrySchema');

const validateSchemaService = require('../../services/validateSchemaService');

const insertEntryController = async (req, res, next) => {
    try {
        const { filename, description } = req.body;

        // Object.assign(req.body, req.files.file);
        console.log(req.body);
        // console.log(combinedData);
        // console.log(combinedData.filename);
        if (!req.files?.file) missingFieldsError();

        // Validamos datos con esquema de Joi
        await validateSchemaService(insertEntrySchema, req.body);
        const { file } = req.files;
        console.log(req.files);
        // Obtenemos datos del usuario usando token
        const userId = req.user.id;

        // console.log(userId);
        // Guardamos el archivo en la carpeta.
        const fileName = await saveFileService(file);
        // console.log(fileName);
        await insertEntryModel(filename, description, fileName, userId);

        res.send({
            status: 'ok',
            message: 'Servicio creado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = insertEntryController;
