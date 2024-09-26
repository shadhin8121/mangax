const cluster = require("cluster");
const os = require("os");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authenticating_user = require("./route/auth_user_and_role.route"); // No .js extension needed
const dotenv = require("dotenv");

dotenv.config();

const numCPUs = os.cpus().length; // Number of CPU cores
const port = process.env.PORT || 4053;

if (cluster.isMaster) {
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // cluster.fork(); //for now do not restart instances
    });
} else {
    // Worker processes
    const app = express();

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
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
    app.use(cors(corsOptions));

    //this line need to come after setting up cores options
    app.use(cookieParser());
    // Basic middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Middleware routes
    // This One only for routers
    app.use(authenticating_user);

    // Start server
    app.listen(port, () => {
        console.log(
            `Worker server instance ${process.pid} is running on port ${port}`
        );
    });
}
