// Import Packages
import chalk from "chalk";

// Import Modules
import Notification from "./Notification.js";

// Import Config
import Config from "../Configs/Config.json" assert { type: "json" }

// Listen Module
export default function Listen (app, port) {
    app.listen(port, () => {
        Notification(`Server Started And Listen to Port ${chalk.green(port)} With Url: ${chalk.green(`${Config.Url}:${port}`)}`)
    })
}