const mongoose = require('mongoose');

const counsellorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },

    specialization: {
        type: String,
        required: true,
        trim: true,
    },

    experience: {
        type: Number,
        required: true,
        min: 0,
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },

    sessionFee: {
        type: Number,
        required: true,
        min: 0,
    },

    availability: {
        type: String,
        required: true,
        trim: true,
    },
},
    {
        timestamps: true,
    }
);

const counsellorModel = mongoose.model('Counsellors', counsellorSchema);

module.exports = counsellorModel;