const authController = require('../helpers/authController');

module.exports = async (req, res, next) => {
    if (req.token) {
        try {
            const payLoad = await authController.verifyToken(req.token);
            req.decoded = payLoad;
            return next();
        } catch (error) {
            return next(new Error("Invalid access token"));
        }
    } else {
        return next(new Error("Access token is missing"))
    }
}