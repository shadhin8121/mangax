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
        const cover_image_filename = req.file ? req.file.filename : null;

        // Creating the manga_data record
        const creating_new_manga = await prisma.manga_data.create({
            data: {
                title,
                cover_image: cover_image_filename,
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

async function getting_home_page_data_for_translator(req, res) {
    try {
        const translator_id = req.translator_information?.id;

        if (!translator_id) {
            return res.status(400).json({
                success: false,
                message: "Translator ID is missing",
            });
        }

        // Fetch manga data related to the specific translator
        const translatorWithMangaData = await prisma.translator.findUnique({
            where: { id: translator_id },
            include: {
                connection: {
                    include: {
                        manga_data: true,
                    },
                },
            },
        });

        if (!translatorWithMangaData) {
            return res.status(404).json({
                success: false,
                message: "Translator not found",
            });
        }

        // Deduplicate and map data
        const seenIds = new Set();
        const formattedMangaData = translatorWithMangaData.connection
            .map((conn) => conn.manga_data)
            .filter((manga) => {
                if (!seenIds.has(manga.id)) {
                    seenIds.add(manga.id);
                    return true;
                }
                return false;
            })
            .map((manga) => ({
                id: manga.id,
                title: manga.title,
                cover_image: manga.cover_image,
            }));

        res.status(200).json({
            success: true,
            message: formattedMangaData,
        });
    } catch (error) {
        console.error(error.message); // Use console.error for errors
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

module.exports = {
    translator_profile_data,
    translator_create_new_manga,
    getting_home_page_data_for_translator,
};
