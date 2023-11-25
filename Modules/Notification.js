// Import Packages
import chalk from "chalk";

// Notification Modules
export default function Notification(Message) {
    console.log(`${chalk.red('[')}${chalk.blue('APPLICATION')}${chalk.red(']')} => ${chalk.white(Message)}.`)
}