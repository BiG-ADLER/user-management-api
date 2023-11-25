// Import Packages
import express from "express";
import { config } from "dotenv"; config();

// Import Modules
import Listen from "./Modules/Listen.js";

// Import Config Files
import Config from "./Configs/Config.json" assert { type: "json" };

// Import Classes
import Database from "./Classes/Database/Database.js";

// Import Handlers
import DatabaseHandler from "./Handlers/Database.js";
import CrashHandler from "./Handlers/CrashHandler.js";

// Main Code
const app = express()

// Start Crash Handler
await CrashHandler.Load()

// Connect to Database
await DatabaseHandler.Start()

const Data = new Database();

app.use(express.json())

// GET Status Of API Started or Not
app.get('/status', (req, res) => {
    res.send({
        Status: "Running"
    });
})

// POST Some Data Like Username, Email, Password And Create User If Not Exists
app.post('/create', (req, res, next) => {

    const {Username, Email, Password} = req.body

    Data.CreateUser(Username, Email, Password).then(message => {
        switch (message.Status.Message) {
            case "User Has Been Successfully Created!":
                res.status(201).send(message.Status.Message)
            break;

            case "Please Fil Form Completely!":
                res.status(204).send(message.Status.Message)
            break;

            case "User Has Been Created Before!":
                res.status(406).send(message.Status.Message)
            break;

            default:break;
        }
    }).catch((e) => {
        console.log(e)
    })

})

// POST Some Data Like Email, Password And Login Into User Account
app.post('/login', (req, res, next) => {

    const {Email, Password} = req.body

    Data.LoginUser(Email, Password).then(message => {
        switch (message.Status.Code) {
            case 200:
                res.status(200).send(message.Status.Message)
            break;

            case 404:
                res.status(404).send(message.Status.Message)
            break;

            case 401:
                res.status(401).send(message.Status.Message)
            break;

            default:break;
        }
    }).catch((e) => {
        console.log(e)
    })

    next();

})

// DELETE User With Getting Some Data Like Email, Password
app.delete('/delete', (req, res) => {

    const {Email, Password} = req.body

    Data.DeleteUser(Email, Password).then(message => {
        switch (message.Status.Code) {
            case 200:
                res.status(200).send(message.Status.Message)
            break;

            case 401:
                res.status(401).send(message.Status.Message)
            break;

            case 404:
                res.status(404).send(message.Status.Message)
            break;

            default:break;
        }
    })

    next();

})

// GET User Data With Getting Some Data Like Email, Password
app.get('/user/:email', (req, res) => {

    const {email} = req.params

    Data.FetchUsers("User", email).then(data => {
        switch (data.Status.Code) {
            case 200:
                res.status(200).send(data.Data)
            break;

            case 404:
                res.status(404).send(data.Status.Message)
            break;

            default:break;
        }
    }).catch((e) => {
        console.log(e)
    })

})

Listen(app, Config.Port)