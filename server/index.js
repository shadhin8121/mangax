const express = require("express");
require("dotenv").config();
const user_router = require("./route/auth_user.route.js");
const cors = require("cors");
const translator_group_router = require("./route/auth_translator_group.route.js");

//basic code
const app = express();
const port = process.env.PORT || 4053;
//basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//credentials
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:4043",
    ], // Add other origins as needed
    credentials: true,
};

app.use(cors(corsOptions));
//middleware routes
app.use(user_router);
app.use(translator_group_router);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
