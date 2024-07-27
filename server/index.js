const express = require("express");
require("dotenv").config();
const user_router = require("./route/user.route.js");
const cors = require("cors");

//basic code
const app = express();
const port = process.env.PORT || 4053;
//basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//middleware routes
app.use(user_router);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
