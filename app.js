// Import Packages
import express from "express";
import { config } from "dotenv"; config();

// Import Modules
import Listen from "./Modules/Listen.js";

// Import Config Files
import Config from "./Configs/Config.json" assert { type: "json" };

// Import Handlers
import DatabaseHandler from "./Handlers/Database.js";
import CrashHandler from "./Handlers/CrashHandler.js";

// Import Routes
import User from "./Routes/User.js"

// Main Code
const app = express()

// Start Crash Handler
await CrashHandler.Load()

// Connect to Database
await DatabaseHandler.Start()

app.use(express.json())

// Deploy Api Routes
app.use(`/api/${Config.ApiVersion}/user`, User)

// GET Status Of API Started or Not
app.get('/status', (req, res) => {
    res.send({
        Status: "Running"
    });
})

Listen(app, Config.Port)