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
        
        // const { name, description } = req.body;
    
        // Lanzamos error si no envian archivo.
        // console.log(req.files.file);
        if (!req.files?.file) missingFieldsError();

        // Validamos datos con esquema de Joi
        // await validateSchemaService(insertEntrySchema, req.body);
        console.log(req.files);
        const { file } = req.files; // despues
        const { name, description } = req.files.data;
        
        // console.log(file);
        // Obtenemos datos del usuario usando token
        const { userId } = req.user.id;

        // console.log(userId);
        // Guardamos el archivo en la carpeta.
        const fileName = await saveFileService(file);
        // console.log(fileName);
        await insertEntryModel( name, description, fileName, userId);

        res.send({
            status: 'ok',
            message: 'Servicio creado'  
        })
    } catch (err) {
        next(err);
    }
}

module.exports = insertEntryController;