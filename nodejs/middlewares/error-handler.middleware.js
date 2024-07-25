const errorHandler = (err, req, res, next) => {
    res.json({
        success: false,
        message: err.message,
    });
    next();
};
module.exports = errorHandler;
