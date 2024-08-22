const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const prisma = new PrismaClient();

// Salting round
const saltingRound = 10;

//registering Translator
async function register_translator(req, res) {
    try {
        /* 
        username: _,
        website: _,
        translatorGroup: _,
        email: _,
        password: _,
        discordLink: _
    */
        let {
            username,
            website,
            translatorGroup,
            email,
            password,
            discordLink,
        } = req.body;

        let hashed_password = await bcrypt.hash(password, saltingRound);

        let registering_translator = await prisma.translator.create({
            data: {
                username,
                email,
                password: hashed_password,
                website,
                translator_group: translatorGroup,
                discord: discordLink,
            },
        });

        res.status(201).json(registering_translator);
    } catch (err) {
        if (err.code === "P2002") {
            // Extract the field that caused the unique constraint violation
            const field = err.meta.target[0];
            res.status(409).json({ error: `${field} already exists` });
        } else {
            res.status(500).json({ error: "Server Internal Error" });
        }
    }
}

function get_translator(req, res) {
    res.send("hello world this is tgroup");
}

module.exports = {
    get_translator,
    register_translator,
};
