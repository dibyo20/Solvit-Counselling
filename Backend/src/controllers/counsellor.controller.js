const counsellorModel = require("../models/counsellor.model");

async function addCounsellor(req, res) {
    const { name, image, specialization, experience, rating, sessionFee, availability } = req.body;
    const newCounsellor = await counsellorModel.create({
        name,
        image,
        specialization,
        experience,
        rating,
        sessionFee,
        availability
    });
    res.status(201).json({
        message: "Counsellor added successfully",
        data: newCounsellor
    });
}

async function getAllCounsellors(req, res) {
    const counsellors = await counsellorModel.find();
    res.status(200).json({
        message: "Counsellors fetched successfully",
        data: counsellors
    });
}



module.exports = {
    addCounsellor,
    getAllCounsellors
}