import mongoose, { Schema, Document } from "mongoose"
import { IComment } from "../../../domain/models/comment.interface"

const commentSchema = new mongoose.Schema({
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    comment: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
})

const Comment = mongoose.model<IComment & Document>("Comment", commentSchema)

export default Comment
