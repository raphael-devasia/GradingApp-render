import mongoose, { Schema } from "mongoose"
import { ASSIGNMENT_TYPES } from "../../../domain/models/assignment-types"
import { IAssignment } from "../../../domain/models/assignment.interface"


const AssignmentSchema = new Schema<IAssignment>(
    {
        title: { type: String, required: true, trim: true },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(ASSIGNMENT_TYPES),
        },
        dueDate: { type: String, required: true },
        description: { type: String, required: true, trim: true },
        learningObjectives: { type: String, required: true, trim: true },
        instructions: { type: String, trim: true },
        rubric: { type: String, trim: true },
        questions: { type: String, trim: true },
        answerKey: { type: String, trim: true },
        checklist: { type: String, trim: true },
        participationCriteria: { type: String, trim: true },
        peerEvaluation: { type: String, trim: true },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        strict: "throw",
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id.toString()
                ret.courseId = ret.courseId.toString()
                ret.userId = ret.userId.toString()
                delete ret._id
                delete ret.__v
            },
        },
    }
)

export default mongoose.model<IAssignment>("Assignment", AssignmentSchema)
