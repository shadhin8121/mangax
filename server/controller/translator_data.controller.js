const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function translator_profile_data(req, res) {
    try {
        const user_id = req.translator_information.id;
        const user_data = await prisma.translator.findUnique({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                website: true,
                translator_group: true,
                discord: true,
                created_at: true,
            },
        });

        if (!user_data) {
            return res
                .status(404)
                .json({ success: false, message: "Translator not found" });
        }
        res.json({
            success: true,
            data: user_data,
        });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function translator_create_new_manga(req, res) {
    try {
        // Extracting data from the request body
        const {
            title,
            altTitle = [],
            description,
            type,
            status,
            artist = [],
            author = [],
            genres = [],
            publisher = [],
        } = req.body;

        // Translator ID
        const translator_id = req.translator_information.id;

        // Image path of the file that was uploaded
        const cover_image_path = req.file ? req.file.path : null;

        // Creating the manga_data record
        const creating_new_manga = await prisma.manga_data.create({
            data: {
                title,
                cover_image: cover_image_path,
                alternative_titles: {
                    set: altTitle,
                },
                description,
                type,
                status,
                artists: {
                    set: artist,
                },
                authors: {
                    set: author,
                },
                genres: {
                    set: genres,
                },
                publishers: {
                    set: publisher,
                },
            },
        });

        //checking if manga creating is successful or not
        if (!creating_new_manga) {
            return res.status(400).json({
                success: false,
                message: "bad request",
            });
        }

        // Creating the connection after manga_data is created
        let creating_connection =
            await prisma.manga_and_translator_connection.create({
                data: {
                    translator_id: translator_id,
                    manga_id: creating_new_manga.id, // use the actual ID from newManga
                },
            });

        //checking if creating_connection is successful or not
        if (!creating_connection) {
            console.log("unsuccessful");
        }

        // If creation is successful
        res.status(201).json({
            success: true,
            message: "Created data successfully",
        });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    translator_profile_data,
    translator_create_new_manga,
};
