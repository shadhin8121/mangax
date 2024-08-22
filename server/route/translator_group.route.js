const express = require("express");
const {
    get_translator,
    register_translator,
} = require("../controller/translator_group.controller");
const translator_group_router = express.Router();

translator_group_router.get("/translator", get_translator);
translator_group_router.post("/register_translator", register_translator);

module.exports = translator_group_router;
