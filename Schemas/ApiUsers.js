import { Schema, model } from "mongoose";

const ApiUsers = new Schema({
    Username: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true,
    }
})

ApiUsers.statics.isEmailRegistred = async function(Email) {
    const Status = await this.findOne({Email})

    if (Status) return false
    return true;
}

export default model('ApiUsers', ApiUsers)