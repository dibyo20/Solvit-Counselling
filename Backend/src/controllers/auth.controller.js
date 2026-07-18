const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistedTokenModel = require("../models/blacklist.model.js");

async function registerController(req, res) {
    const { fullname, username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserExists) {
        return res.status(400).json({
            message: "Username or email already exists",
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await userModel.create({
        fullname,
        username,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            fullname: user.fullname,
            email: user.email,
            username: user.username,
        }
    });
}

/**
   * username
   * password
   *
   * { username:test, email:undefined, password:Test12 } = req.body
   *
   * email
   * password
   *
   * { username:undefined, email:test@test.com, password:Test12 } = req.body
   *
   */
async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] }).select("+password");

    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Password is incorrect",
        });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        message: "Login successful",
        user: {
            fullname: user.fullname,
            username: user.username,
            email: user.email,
        }
    });
}

async function logoutController(req, res) {
    const token = req.cookies.token;

    const blacklistedToken = await blacklistedTokenModel.create({ token });

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
        blacklistedToken,
    });
}

module.exports = {
    registerController,
    loginController,
    logoutController,
};