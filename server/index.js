const cluster = require("cluster");
const os = require("os");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const user_router = require("./route/auth_user.route.js");
const translator_group_router = require("./route/auth_translator_group.route.js");
const translator_data_router = require("./route/translator_data.route.js");
require("dotenv").config();

const numCPUs = os.cpus().length; // Number of CPU cores
const port = process.env.PORT || 4053;

if (cluster.isMaster) {
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    // Worker processes
    const app = express();

    // Basic middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Serve static files
    app.use(
        "/cover_image",
        express.static(path.join(__dirname, "../cover_image"))
    );

    // CORS options
    const corsOptions = {
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:4043",
        ],
        credentials: true,
    };
    app.use(cors(corsOptions));

    // Middleware routes
    app.use(user_router);
    app.use(translator_group_router);
    app.use(translator_data_router);

    // Start server
    app.listen(port, () => {
        console.log(`Worker server instance ${process.pid} is running on port ${port}`);
    });
}
