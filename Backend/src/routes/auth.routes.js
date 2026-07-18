const authRouter = require("express").Router();
const { registerController, loginController, logoutController, } = require("../controllers/auth.controller.js");
const { identifyUser } = require("../middlewares/auth.middleware.js");

/**
 * POST /api/auth/register
 * Description: Register a new user
 * Protected: No
 */
authRouter.post("/register", registerController);

/**
 * POST /api/auth/login
 * Description: Login a user
 * Protected: No
 */
authRouter.post("/login", loginController);

/**
 * GET /api/auth/logout
 * Description: Logout a user
 * Protected: Yes
 */
authRouter.get("/logout", identifyUser, logoutController);

module.exports = authRouter;