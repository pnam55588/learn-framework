const resFormatter = (req, res, next) => {
    res.success = function (data) {
        res.json({
            success: true,
            data,
        })
    }
    next();
}
module.exports = resFormatter;