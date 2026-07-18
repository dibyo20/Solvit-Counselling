const counsellorRouter = require('express').Router();
const { addCounsellor, getAllCounsellors } = require('../controllers/counsellor.controller.js');
const { identifyUser } = require("../middlewares/auth.middleware.js");

/**
 * This Route is for Dummy data of counsellors. It is not a part of the main application.
 */
counsellorRouter.post('/add', addCounsellor);

/**
 * Get /api/counsellors/all
 * Description: Get all counsellors
 * Protected: Yes
 */
counsellorRouter.get('/all', identifyUser, getAllCounsellors);

module.exports = counsellorRouter;