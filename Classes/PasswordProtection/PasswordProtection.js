import { hashSync, compareSync } from "bcrypt"

export default class PasswordProtection {


    // Re Generate Password With Hash and Salt (PRIVATE)
    static async #ReGeneratePassword(Password) {
        const SaltRounds = 10
        const HashedPassword = hashSync(Password, SaltRounds)

        return {
            HashedPassword: HashedPassword
        }
    }

    // Verify Password with API Password Input (PRIVATE)
    static async #ComparePassword(InputPassword, UserPassword) {
        if (compareSync(InputPassword, UserPassword)) {
            return {
                IsPasswordCorrect: true
            }
        } else {
            return {
                IsPasswordCorrect: false
            }
        }
    }

    // Make Re Generate Password Funtion Public
    static async ReGeneratePassword(Password) {
        return (await this.#ReGeneratePassword(Password)).HashedPassword
    }

    // Make Verify Password With API Password Input Public
    static async ComparePassword(InputPassword, UserPassword) {
        return (await this.#ComparePassword(InputPassword, UserPassword)).IsPasswordCorrect
    }

}