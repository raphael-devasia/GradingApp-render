import mongoose, { Schema, Document } from "mongoose"
import { IStudent } from "../../../domain/models/students.model"



const studentSchema = new Schema<IStudent>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, default: "password1234ABCD" },
        name: { type: String, required: true },
        classes: {
            type: [String],
            enum: ["all", "english", "history", "math", "science"],
            default: [],
        },
        assignments: [{ type: Schema.Types.ObjectId, ref: "Assignment" }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: { updatedAt: "updatedAt" } }
)

export default mongoose.model<IStudent>("Student", studentSchema)
