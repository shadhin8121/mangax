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
    let data = req.body;
    //req.file.path provides path of the image
    console.log(data);
    res.send(data);
}

module.exports = {
    translator_profile_data,
    translator_create_new_manga,
};