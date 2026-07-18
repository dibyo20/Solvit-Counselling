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
    const searchKeyword = req.query.search;
    if (searchKeyword) {
        const counsellors = await counsellorModel.find({
            $or: [
                { name: { $regex: searchKeyword, $options: 'i' } },
                { specialization: { $regex: searchKeyword, $options: 'i' } }
            ]
        });
        return res.status(200).json({
            message: "Counsellors fetched successfully",
            data: counsellors
        });
    }

    const counsellors = await counsellorModel.find();
    return res.status(200).json({
        message: "Counsellors fetched successfully",
        data: counsellors
    });
}



module.exports = {
    addCounsellor,
    getAllCounsellors,
}