import { IComment } from "../../domain/models/comment.interface"
import { ICommentRepository } from "../../domain/repositories/commentRepository.interface"
import Comment from "../db/models/comment.model"

export class CommentRepositoryMongo implements ICommentRepository {
    async create(comment: IComment): Promise<IComment> {
        console.log(comment)
        try {
            const newComment = new Comment(comment)
            return await newComment.save() // Save the comment to the database
        } catch (error) {
            console.error("Error creating comment:", error) // Log the error for debugging
            throw new Error("Failed to create comment.") // Throw an error with a user-friendly message
        }
    }

    async findById(id: string): Promise<IComment | null> {
        return Comment.findById(id).exec()
    }

    async getAllByPost(postId: string): Promise<IComment[]> {
        try {
            // Fetch all comments for the given postId
            return await Comment.find({ postId }).exec()
        } catch (error) {
            console.error("Error fetching comments by post ID:", error) // Log the error
            throw new Error("Failed to fetch comments.") // Throw a user-friendly error message
        }
    }

    async findByUserId(userId: string): Promise<IComment[]> {
        try {
            // Fetch all comments for the given postId
            return await Comment.find({ userId }).exec()
        } catch (error) {
            console.error("Error fetching comments by user ID:", error) // Log the error
            throw new Error("Failed to fetch comments.") // Throw a user-friendly error message
        }
    }

    async update(
        id: string,
        commentData: Partial<IComment>
    ): Promise<IComment | null> {
        return Comment.findByIdAndUpdate(id, commentData, { new: true }).exec()
    }

    async delete(id: string): Promise<boolean> {
        const result = await Comment.findByIdAndDelete(id).exec()
        return result !== null
    }
}
