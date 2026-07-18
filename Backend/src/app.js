const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.routes.js");
const counsellorRouter = require("./routes/counsellor.routes.js");

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy restriction: origin ${origin} not allowed`));
        }
    },
    credentials: true
}));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Solvit Backend is running..."
    });
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/counsellor", counsellorRouter);

module.exports = app;