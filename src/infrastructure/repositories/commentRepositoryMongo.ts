import { IComment } from "../../domain/models/comment.interface"
import { ICommentRepository } from "../../domain/repositories/commentRepository.interface"
import Comment from "../db/models/comment.model"

export class CommentRepositoryMongo implements ICommentRepository {
    async createComment(comment: IComment): Promise<IComment> {
        console.log(comment)
        try {
            const newComment = new Comment(comment)
            return await newComment.save() // Save the comment to the database
        } catch (error) {
            console.error("Error creating comment:", error) // Log the error for debugging
            throw new Error("Failed to create comment.") // Throw an error with a user-friendly message
        }
    }
    async findCommentById(commentId: string): Promise<IComment | null> {
        return Comment.findById(commentId).exec()
    }
    async findCommentByUserId(userId: string): Promise<IComment[]> {
        try {
            // Fetch all comments for the given postId
            return await Comment.find({ userId }).exec()
        } catch (error) {
            console.error("Error fetching comments by user ID:", error) // Log the error
            throw new Error("Failed to fetch comments.") // Throw a user-friendly error message
        }
    }
   
    async getAllCommentByPost(postId: string): Promise<IComment[]> {
        try {
            // Fetch top-level comments (parentCommentId is null) and populate replies
            const comments = await Comment.find({
                postId,
                parentCommentId: null,
            })
                .populate({
                    path: "parentCommentId",
                    populate: { path: "parentCommentId" }, // Optional: deeper nesting
                })
                .exec()

            // Fetch all replies separately and attach them to their parent comments
            const allComments = await Comment.find({ postId }).exec()
            const commentMap = new Map<string, IComment>()

            allComments.forEach((comment) => {
                commentMap.set(
                    comment._id.toString(),
                    comment.toObject() as IComment
                )
            })

            const topLevelComments = comments.map((comment) => {
                const commentObj = comment.toObject() as IComment
                commentObj.replies = this.getReplies(
                    comment._id.toString(),
                    allComments
                )
                return commentObj
            })

            return topLevelComments
        } catch (error) {
            console.error("Error fetching comments by post ID:", error)
            throw new Error("Failed to fetch comments by post ID.")
        }
    }

    async updateComment(
        commentId: string,
        comment: Partial<IComment>
    ): Promise<IComment | null> {
        try {
            const updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                { $set: comment },
                { new: true }
            ).exec()
            return updatedComment
                ? (updatedComment.toObject() as IComment)
                : null
        } catch (error) {
            console.error("Error updating comment:", error)
            throw new Error("Failed to update comment.")
        }
    }

    async deleteComment(commentId: string): Promise<boolean> {
       
        
        try {
            // First, delete all replies recursively
            await this.deleteReplies(commentId)

            // Then delete the comment itself
            const result = await Comment.findByIdAndDelete(commentId).exec()
            return result !== null
        } catch (error) {
            console.error("Error deleting comment:", error)
            throw new Error("Failed to delete comment.")
        }
    }

    // Helper method to fetch replies for a comment
    private getReplies(commentId: string, allComments: any[]): IComment[] {
        const replies = allComments
            .filter(
                (comment) => comment.parentCommentId?.toString() === commentId
            )
            .map((comment) => {
                const commentObj = comment.toObject() as IComment
                commentObj.replies = this.getReplies(
                    comment._id.toString(),
                    allComments
                )
                return commentObj
            })
        return replies
    }

    // Helper method to delete all replies recursively
    private async deleteReplies(commentId: string): Promise<void> {
        const replies = await Comment.find({
            parentCommentId: commentId,
        }).exec()
        for (const reply of replies) {
            await this.deleteReplies(reply._id.toString()) // Recursively delete nested replies
            await Comment.findByIdAndDelete(reply._id).exec()
        }
    }
}
