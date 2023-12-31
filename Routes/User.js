// Import Packages
import express from "express";

// Import Package Classes
const Router = express.Router();

// Import Classes
import Database from "../Classes/Database/Database.js";

const Data = new Database();

// POST Some Data Like Username, Email, Password And Create User If Not Exists
Router.post('/create', (req, res, next) => {

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
Router.post('/login', (req, res, next) => {

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

    // next();

})

// DELETE User With Getting Some Data Like Email, Password
Router.delete('/delete', (req, res) => {

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

    // next();

})

// GET User Data With Getting Some Data Like Email, Password
Router.get('/:email', (req, res) => {

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

export default Router