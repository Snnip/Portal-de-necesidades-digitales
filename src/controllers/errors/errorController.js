const errorController = (err, req, res, next) => {
    res.status(err.httpStatus || 500).send({
        status: 'error',
        code: err.code || 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Server error',
    });
};

module.exports = errorController;
