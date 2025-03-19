import { IComment } from "../../domain/models/comment.interface"
import { ICommentRepository } from "../../domain/repositories/commentRepository.interface"

export class CommentUseCase {
    constructor(private commentRepository: ICommentRepository) {}

    async createComment(commentData: IComment): Promise<IComment> {
        return this.commentRepository.createComment(commentData)
    }

    async getCommentById(commentId: string): Promise<IComment | null> {
        return this.commentRepository.findCommentById(commentId)
    }
    async getCommentByUserId(userId: string): Promise<IComment[]> {
        return this.commentRepository.findCommentByUserId(userId)
    }

    async getAllCommentsByPost(postId: string): Promise<IComment[]> {
        return this.commentRepository.getAllCommentByPost(postId)
    }

    async updateComment(
        commentId: string,
        commentData: Partial<IComment>
    ): Promise<IComment | null> {
        return this.commentRepository.updateComment(commentId, commentData)
    }

    async deleteComment(commentId: string): Promise<boolean> {
        return this.commentRepository.deleteComment(commentId)
    }
}
