/**
 * Centralized validation utility functions for the application.
 */

/**
 * Validates the request body for registering a new user.
 * @param {Object} data - The request body data.
 * @returns {string|null} - Returns an error message string if invalid, or null if valid.
 */
function validateRegisterData(data) {
    const { fullname, username, email, password } = data || {};

    if (!fullname || !username || !email || !password) {
        return "All fields are required: fullname, username, email, password";
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters long";
    }

    if (username.length < 3) {
        return "Username must be at least 3 characters long";
    }

    return null;
}

/**
 * Validates the request body for user login.
 * @param {Object} data - The request body data.
 * @returns {string|null} - Returns an error message string if invalid, or null if valid.
 */
function validateLoginData(data) {
    const { username, email, password } = data || {};

    if (!password) {
        return "Password is required";
    }

    if (!username && !email) {
        return "Either username or email is required";
    }

    return null;
}

/**
 * Validates the request body for adding a counsellor.
 * @param {Object} data - The request body data.
 * @returns {string|null} - Returns an error message string if invalid, or null if valid.
 */
function validateAddCounsellorData(data) {
    const { name, specialization, experience, rating, sessionFee, availability } = data || {};

    if (!name || !specialization || experience === undefined || !sessionFee || !availability) {
        return "Required fields: name, specialization, experience, sessionFee, availability";
    }

    if (typeof experience !== "number" || experience < 0) {
        return "Experience must be a non-negative number";
    }

    if (rating !== undefined && (typeof rating !== "number" || rating < 0 || rating > 5)) {
        return "Rating must be a number between 0 and 5";
    }

    if (typeof sessionFee !== "number" || sessionFee < 0) {
        return "Session fee must be a non-negative number";
    }

    return null;
}

module.exports = {
    validateRegisterData,
    validateLoginData,
    validateAddCounsellorData,
};
