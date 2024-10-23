const cluster = require("cluster");
const os = require("os");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authenticating_user = require("./route/auth_user_and_role.route"); // No .js extension needed
const dotenv = require("dotenv");
const { user_related_data_router } = require("./route/user_related_data.route");
const { init_owner } = require("./util/init_owner");

dotenv.config();

const numCPUs = os.cpus().length; // Number of CPU cores
const port = process.env.PORT || 4053;

// Worker process function to handle individual server instances
async function startWorker() {
    try {
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
        };
        app.use(cors(corsOptions));

        //this line need to come after setting up cores options
        app.use(cookieParser());
        // Basic middleware
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Middleware routes
        // This One only for routers
        app.use(authenticating_user); // this is used in login and logout and register routes
        //user related data. for example: profile upload, update name, etc.
        app.use(user_related_data_router);

        // Start server
        app.listen(port, () => {
            console.log(
                `Worker server instance ${process.pid} is running on port ${port}`
            );
        });
    } catch (error) {
        console.error(`Worker ${process.pid} failed to start:`, error);
        process.exit(1); // Exit with error code
    }
}

// Master process function to handle initialization and worker management
async function startMaster() {
    try {
        // Initialize owner in master process before forking workers
        // This prevents race conditions from multiple processes trying to create owner
        console.log('Initializing owner account...');
        await init_owner();
        console.log('Owner initialization successful');

        // Fork workers based on CPU cores
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        // Handle worker exits
        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
            // cluster.fork(); //for now do not restart instances
        });

        // Handle graceful shutdown signals
        process.on('SIGTERM', () => {
            console.log('Master received SIGTERM - shutting down gracefully...');
            for (const id in cluster.workers) {
                cluster.workers[id].kill();
            }
            process.exit(0);
        });

    } catch (error) {
        console.error('Failed to initialize owner account:', error);
        process.exit(1); // Exit if owner initialization fails
    }
}

// Main process branching logic
if (cluster.isMaster) {
    // Start master process which handles initialization and worker management
    startMaster().catch(error => {
        console.error('Master process failed:', error);
        process.exit(1);
    });
} else {
    // Start individual worker process
    startWorker().catch(error => {
        console.error('Worker process failed:', error);
        process.exit(1);
    });
}