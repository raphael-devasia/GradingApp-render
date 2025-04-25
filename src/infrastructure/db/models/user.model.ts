import mongoose, { Schema, Document } from "mongoose"
import { IUser } from "../../../domain/models/user.interface"




const userSchema = new Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    classroomId: { type: String, required: false },
    googleId: { type: String, unique: true, sparse: true },
    microsoftId: { type: String, unique: true, sparse: true },

    subscription: {
        plan: String,
        billingCycle: String,
        stripeCustomerId: String,
        stripeSubscriptionId: String,
        status: String,
    },
    createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model<IUser & Document>("User", userSchema)

export default User
