const counsellorModel = require("../models/counsellor.model");

/**
 * This controller is used to add a new counsellor, and is not the part of the main application.
 */
async function addCounsellor(req, res) {
    const { name, image, specialization, experience, rating, sessionFee, availability } = req.body;

    if (!name || !specialization || experience === undefined || !sessionFee || !availability) {
        return res.status(400).json({
            message: "Required fields: name, specialization, experience, sessionFee, availability",
        });
    }

    if (typeof experience !== "number" || experience < 0) {
        return res.status(400).json({ message: "Experience must be a non-negative number" });
    }

    if (rating !== undefined && (typeof rating !== "number" || rating < 0 || rating > 5)) {
        return res.status(400).json({ message: "Rating must be a number between 0 and 5" });
    }

    if (typeof sessionFee !== "number" || sessionFee < 0) {
        return res.status(400).json({ message: "Session fee must be a non-negative number" });
    }

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