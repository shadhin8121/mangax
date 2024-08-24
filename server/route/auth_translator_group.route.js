const express = require("express");
const {
    register_translator,
    login_translator,
} = require("../controller/auth_translator_group.controller");
const translator_group_router = express.Router();

translator_group_router.post("/register_translator", register_translator);
translator_group_router.post("/login_translator", login_translator);

module.exports = translator_group_router;
