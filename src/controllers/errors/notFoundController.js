const { notFoundError } = require('../../services/errorService');

const notFoundController = (req, res, next) => {
    next(notFoundError('ruta'));
};

module.exports = notFoundController;
