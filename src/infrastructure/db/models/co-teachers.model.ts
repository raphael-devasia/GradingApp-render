import mongoose, { Schema, Document } from "mongoose"
import { ICoTeacher } from "../../../domain/models/co-teacher.model"


const coTeacherSchema = new Schema<ICoTeacher>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, default: "1234ABCD" },
        classes: {
            type: [String],
            enum: ["all", "english", "history", "math", "science"],
            default: [],
        },
        status: {
            type: String,
            enum: ["pending", "active", "inactive"],
            default: "pending",
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: { updatedAt: "updatedAt" } }
)

export default mongoose.model<ICoTeacher>("CoTeacher", coTeacherSchema)
