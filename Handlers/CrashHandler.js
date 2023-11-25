import chalk from "chalk";
import process from "node:process";
import Notification from "../Modules/Notification.js";

export default class CrashHandler {
    constructor() {

    }

    static async #UnHandledRejection() {
        process.on('unhandledRejection', error => {
            this.#Prefix('UnHandledRejection', `Unhandled Rejection, ${error}`)
        })
    }

    static async #UnCaughtException() {
        process.on('uncaughtException', (err) => {
            this.#Prefix('UnCaughtException', `Uncaught Exception: ${err}`)
        })
    }

    static async #UnCaughtExceptionMonitor() {
        process.on('uncaughtExceptionMonitor', (err) => {
            this.#Prefix('UnCaughtExceptionMonitor', `Uncaught Exception Monitor: ${err}`)
        })
    }

    static #Prefix(Promise, Message) {
        console.log(`${chalk.red('[')}${chalk.blue('AntiCrash')}${chalk.red(']')}: ${chalk.green(`${Promise}`)} => ${chalk.yellow(Message)}.`)
    }

    static async Load() {
        await this.#UnCaughtException()
        await this.#UnHandledRejection()
        await this.#UnCaughtExceptionMonitor()
        await Notification('Crash Handler Started Successfully')
    }

}