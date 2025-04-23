import mongoose, { Schema, Document } from "mongoose"
import { IUser } from "../../../domain/models/user.interface"
import { ISubscription } from "../../../domain/models/subscription.interface"

const subscriptionSchema: Schema = new Schema<ISubscription>({
    plan: { type: String },
    billingCycle: { type: String },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    status: { type: String },
})

const userSchema = new Schema({
    name: { type: String, required: true },
    
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    
    subscription: { type: subscriptionSchema, default: {} },
    createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model<IUser & Document>("User", userSchema)

export default User
