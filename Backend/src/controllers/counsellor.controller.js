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
        const { search, specialization, sortBy } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { specialization: { $regex: search, $options: "i" } },
            ];
        }

        if (specialization && specialization !== "All") {
            query.specialization = { $regex: `^${specialization}$`, $options: "i" };
        }

        let dbQuery = counsellorModel.find(query);

        if (sortBy) {
            if (sortBy === "Highest Rating") {
                dbQuery = dbQuery.sort({ rating: -1 });
            } else if (sortBy === "Experience") {
                dbQuery = dbQuery.sort({ experience: -1 });
            }
        }

        const counsellors = await dbQuery;

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