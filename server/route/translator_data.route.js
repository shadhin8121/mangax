// routes/translator_data_router.js
const express = require("express");
const upload_cover = require("../util/upload_cover");
const authenticate_translator = require("../util/authenticate_translator");

//API functions
const {
    translator_profile_data,
    translator_create_new_manga,
    getting_home_page_data_for_translator,
    get_manga_data,
} = require("../controller/translator_data.controller");

//router name
const translator_data_router = express.Router();

// Route for fetching translator profile data with authentication
translator_data_router.get(
    "/translator_profile_data",
    authenticate_translator,
    translator_profile_data
);

// Creating a new manga only. No chapters for this route
translator_data_router.post(
    "/create_new_manga",
    authenticate_translator,
    upload_cover.single("cover"),
    translator_create_new_manga
);

//getting data for home page only. it provides title and cover and id image only to save bandwidth
translator_data_router.get(
    "/get_translator_home_page_data",
    authenticate_translator,
    getting_home_page_data_for_translator
);

translator_data_router.get(
    "/get_manga_data/:id",
    authenticate_translator,
    get_manga_data
);

module.exports = translator_data_router;
