import mongoose, { Schema, Document } from "mongoose"
import { IUser } from "../../../domain/models/user.interface"

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
})

const User = mongoose.model<IUser & Document>("User", userSchema)

export default User
