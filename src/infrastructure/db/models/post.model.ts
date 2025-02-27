import mongoose, { Schema, Document } from "mongoose"
import { IPost } from "../../../domain/models/post.interface"

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    permalink: { type: String, required: true },

    content: { type: String, required: true },
    image: { type: String },
    excerpt: { type: String },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    status: { type: String, default: "new" },
    createdAt: { type: Date, default: Date.now },
    // userId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
})

const Post = mongoose.model<IPost & Document>("Post", postSchema)

export default Post
