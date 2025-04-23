import mongoose, { Schema } from "mongoose"
import { IClassroom } from "../../../domain/models/classroom.model"

const ClassroomSchema = new Schema<IClassroom>(
    {
        teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        coTeacherIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
        studentIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id.toString()
                ret.teacherId = ret.teacherId.toString()
                ret.coTeacherIds = ret.coTeacherIds.map((id: any) =>
                    id.toString()
                )
                ret.studentIds = ret.studentIds.map((id: any) => id.toString())
                delete ret._id
                delete ret.__v
            },
        },
    }
)

export default mongoose.model<IClassroom>("Classroom", ClassroomSchema)
