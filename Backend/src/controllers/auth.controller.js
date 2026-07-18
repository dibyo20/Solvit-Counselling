const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const isProduction = process.env.NODE_ENV === "production";

async function registerController(req, res) {
    const { fullname, username, email, password } = req.body;

    try {
        const isUserExists = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (isUserExists) {
            return res.status(400).json({
                message: "Username or email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullname,
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                fullname: user.fullname,
                email: user.email,
                username: user.username,
            },
        });
    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({ message: "Internal server error during registration" });
    }
}

/**
 * Login accepts either username+password or email+password.
 *
 * { username: "test", password: "Test12" }
 *   OR
 * { email: "test@test.com", password: "Test12" }
 */
async function loginController(req, res) {
    const { username, email, password } = req.body;

    try {
        const query = [];
        if (username) query.push({ username });
        if (email) query.push({ email });

        const user = await userModel.findOne({ $or: query }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                fullname: user.fullname,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Internal server error during login" });
    }
}

async function logoutController(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({ message: "Internal server error during logout" });
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController,
};