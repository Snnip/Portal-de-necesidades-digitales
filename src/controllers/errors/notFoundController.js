const { notFoundError } = require('../../services/errorService');

const notFound = (req, res, next) => {
    next(notFoundError('ruta'));
};

module.exports = notFound;
