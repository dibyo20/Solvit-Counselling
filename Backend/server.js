require("dotenv").config();
const app = require("./src/app.js");
const PORT = process.env.PORT || 5000;
const connecDB = require("./src/config/db.config.js");

connecDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});