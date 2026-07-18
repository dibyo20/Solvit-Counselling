const counsellorModel = require("../models/counsellor.model");

/**
 * This controller is used to add a new counsellor, and is not the part of the main application.
 */
async function addCounsellor(req, res) {
    const { name, image, specialization, experience, rating, sessionFee, availability } = req.body;

    try {
        const newCounsellor = await counsellorModel.create({
            name,
            image,
            specialization,
            experience,
            rating,
            sessionFee,
            availability,
        });

        return res.status(201).json({
            message: "Counsellor added successfully",
            data: newCounsellor,
        });
    } catch (err) {
        console.error("Add Counsellor Error:", err);
        return res.status(500).json({ message: "Internal server error while adding counsellor" });
    }
}

async function getAllCounsellors(req, res) {
    try {
        const searchKeyword = req.query.search;
        let counsellors;

        if (searchKeyword) {
            counsellors = await counsellorModel.find({
                $or: [
                    { name: { $regex: searchKeyword, $options: "i" } },
                    { specialization: { $regex: searchKeyword, $options: "i" } },
                ],
            });
        } else {
            counsellors = await counsellorModel.find();
        }

        return res.status(200).json({
            message: "Counsellors fetched successfully",
            data: counsellors,
        });
    } catch (err) {
        console.error("Get Counsellors Error:", err);
        return res.status(500).json({ message: "Internal server error while fetching counsellors" });
    }
}

module.exports = {
    addCounsellor,
    getAllCounsellors,
};