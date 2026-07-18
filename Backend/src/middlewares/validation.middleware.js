const {
    validateRegisterData,
    validateLoginData,
    validateAddCounsellorData,
} = require("../utils/validation.js");

/**
 * Middleware to validate registration requests.
 */
function validateRegister(req, res, next) {
    const error = validateRegisterData(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }
    next();
}

/**
 * Middleware to validate login requests.
 */
function validateLogin(req, res, next) {
    const error = validateLoginData(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }
    next();
}

/**
 * Middleware to validate adding a new counsellor requests.
 */
function validateAddCounsellor(req, res, next) {
    const error = validateAddCounsellorData(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }
    next();
}

module.exports = {
    validateRegister,
    validateLogin,
    validateAddCounsellor,
};
