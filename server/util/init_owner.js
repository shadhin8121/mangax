const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
require("dotenv").config();

const prisma = new PrismaClient();

// Constants
const SALT_ROUNDS = 10;
const OWNER_ROLE = "OWNER";

// Owner credentials from environment variables
const OWNER_EMAIL = process.env.OWNER_EMAIL;
const OWNER_PASSWORD = process.env.OWNER_PASSWORD;

async function validateEnvironmentVars() {
    if (!OWNER_EMAIL || !OWNER_PASSWORD) {
        throw new Error(
            "Owner credentials not found in environment variables (OWNER_EMAIL and OWNER_PASSWORD)"
        );
    }
}

async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        throw new Error(`Password hashing failed: ${error.message}`);
    }
}

async function handleExistingOwners(hashedPassword) {
    try {
        // Find all users with OWNER role
        const existingOwners = await prisma.user.findMany({
            where: { role: OWNER_ROLE },
        });

        if (existingOwners.length === 0) {
            // Create new owner if none exists
            const newOwner = await prisma.user.create({
                data: {
                    email: OWNER_EMAIL,
                    password: hashedPassword,
                    role: OWNER_ROLE,
                    username: "System Owner",
                },
            });
            console.log(`Created new owner account with email: ${OWNER_EMAIL}`);
            return { action: "created", owner: newOwner };
        }

        // If there are multiple owners, keep the first one and delete others
        if (existingOwners.length > 1) {
            const keepOwnerId = existingOwners[0].id;
            await prisma.user.deleteMany({
                where: {
                    AND: [{ role: OWNER_ROLE }, { NOT: { id: keepOwnerId } }],
                },
            });
            console.log(
                `Removed ${existingOwners.length - 1} duplicate owner accounts`
            );
        }

        // Update the remaining owner
        const updatedOwner = await prisma.user.update({
            where: { id: existingOwners[0].id },
            data: {
                email: OWNER_EMAIL,
                password: hashedPassword,
                username: "System Owner",
            },
        });

        console.log(
            `Updated existing owner account with email: ${OWNER_EMAIL}`
        );
        return { action: "updated", owner: updatedOwner };
    } catch (error) {
        throw new Error(`Failed to handle owner accounts: ${error.message}`);
    }
}

async function init_owner() {
    console.log("Starting owner initialization process...");

    try {
        await validateEnvironmentVars();
        const hashedPassword = await hashPassword(OWNER_PASSWORD);
        const result = await handleExistingOwners(hashedPassword);

        console.log("Owner initialization completed successfully");

        return {
            success: true,
            action: result.action,
            owner: {
                id: result.owner.id,
                email: result.owner.email,
                role: result.owner.role,
            },
        };
    } catch (error) {
        console.error("Owner initialization failed:", error.message);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    init_owner,
};
