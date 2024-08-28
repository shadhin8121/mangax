const express = require("express");
const {
    register_translator,
    login_translator,
    authenticate_user,
} = require("../controller/auth_translator_group.controller");
const translator_group_router = express.Router();

//registering a translator
translator_group_router.post("/register_translator", register_translator);
//login route for a translator
translator_group_router.post("/login_translator", login_translator);

module.exports = translator_group_router;
