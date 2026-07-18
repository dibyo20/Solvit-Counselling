const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:5000"
];

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
app.use("/api/counsellors", counsellorRouter);

module.exports = app;