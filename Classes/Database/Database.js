import chalk from "chalk";
import { connect } from "mongoose";

import Notification from "../../Modules/Notification.js";
import Authenticator from "../Auth/Authenticator.js";
import PasswordProtection from "../PasswordProtection/PasswordProtection.js";

import ApiUsers from "../../Schemas/ApiUsers.js";


export default class Database {

    constructor(Username = "", Password = "") {
        this.Username = Username;
        this.Password = Password;
    }

    async Connect() {
        try {
            await connect(`mongodb+srv://${this.Username}:${this.Password}@discordbot.od7o2zq.mongodb.net/`).then(() => {
                Notification('Connection Successfully Established!')
            }).catch((e) => {
                Notification(`[ Database ]: ${chalk.red('Connection Problem!')}, Error Message: ${e}`)
            })
        } catch (error) {
            Notification(`Database => Connect ${error}`)
        }
    }

    async CreateUser(Username, Email, Password) {
        const IsUserRegistred = await ApiUsers.isEmailRegistred(String(Email))

        try {
            if (IsUserRegistred) {
                if ((Username && Email && Password) != (null || undefined)) {
                    const User = await new ApiUsers({
                        Username: Username,
                        Email: Email,
                        Password: await PasswordProtection.ReGeneratePassword(Password)
                    })

                    await User.save().catch((e) => {
                        console.log(`❌ There is An Error When Creating User. Error => ${e}`)
                        return {
                            Status: {
                                Message: "There is An Error When Creating User!",
                                Code: 404
                            }
                        }
                    })
                    console.log(`✅ ${Username} Account Has Been Created Successfully!`)
                    return {
                        Status: {
                            Message: "User Has Been Successfully Created!",
                            Code: 201
                        }
                    }
                } else {
                    return {
                        Status: {
                            Message: "Please Fil Form Completely!",
                            Code: 204
                        }
                    }
                }
            } else {
                return {
                    Status: {
                        Message: "User Has Been Created Before!",
                        Code: 406
                    }
                }
            }
        } catch (error) {
            Notification(`Database => CreateUser ${error}`)
        }
    }

    async LoginUser(Email, Password) {
        try {
            const IsUserRegistred = await ApiUsers.isEmailRegistred(String(Email))

            if (IsUserRegistred) {
                return {
                    Status: {
                        Message: "User Not Found",
                        Code: 404
                    }
                }
            } else {
                const UserData = await ApiUsers.findOne({Email: Email})
                const TokenKey = await Authenticator.CreateAuthenticateToken(UserData.Username)

                if (UserData) {
                    if (await PasswordProtection.ComparePassword(Password, UserData.Password) == true) {
                        return {
                            Status: {
                                Message: "You Have Been Logined Successfully To Your Account!",
                                AuthKey: TokenKey,
                                Code: 200
                            },
                            Data: {
                                Username: UserData.Username,
                                Email: UserData.Email,
                                Password: UserData.Password
                            }
                        }
                    } else {
                        return {
                            Status: {
                                Message: "Password Is Wrong",
                                Code: 401
                            }
                        }
                    }
                }
            }

        } catch (error) {
            Notification(`Database => LoginUser ${error}`)
        }
    }

    async DeleteUser(Email, Password) {
        try {
            const IsUserRegistred = await ApiUsers.isEmailRegistred(String(Email))

            if (IsUserRegistred) {
                return {
                    Status: {
                        Message: "User Not Found",
                        Code: 404
                    }
                }
            } else {
                const UserData = await ApiUsers.findOne({Email: Email})
                if (UserData) {

                    if (Password == UserData.Password) {
                        UserData.deleteOne({})
                        return {
                            Status: {
                                Message: "User Has Been Deleted",
                                Code: 200
                            }
                        }
                    } else {
                        return {
                            Status: {
                                Message: "Password Is Wrong",
                                Code: 401
                            }
                        }
                    }
                }
            }

        } catch (error) {
            Notification(`Database => DeleteUser ${error}`)
        }
    }

    async FetchUsers(Mode, Email) {
        try {

            if (Mode === "User") {
                const UserData = await ApiUsers.findOne({Email: Email})
                if (UserData) {

                    return {
                        Status: {
                            Message: "User Finded Successfully!",
                            Code: 200
                        },
                        Data: {
                            Username: UserData.Username,
                            Email: UserData.Email,
                            Password: UserData.Password
                        }
                    }

                } else {
                    return {
                        Status: {
                            Message: "User Not Found",
                            Code: 404
                        }
                    }
                }
            } else if (Mode === "All") {

            } else {
                return
            }

        } catch (error) {
            Notification(`Database => FetchUser ${error}`)
        }
    }

}