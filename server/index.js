const express = require("express");
require("dotenv").config();
const user_router = require("./route/auth_user.route.js");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Add this line
const translator_group_router = require("./route/auth_translator_group.route.js");
const translator_profile_router = require("./route/translator_profile.route.js");

// Basic code
const app = express();
const port = process.env.PORT || 4053;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Add this line

// Credentials
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:4043",
    ], // Add other origins as needed
    credentials: true,
};

app.use(cors(corsOptions));

// Middleware routes
app.use(user_router);
app.use(translator_group_router);
app.use(translator_profile_router);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
