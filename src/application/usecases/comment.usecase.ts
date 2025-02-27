import { IComment } from "../../domain/models/comment.interface"
import { ICommentRepository } from "../../domain/repositories/commentRepository.interface"

export class CommentUseCase {
    constructor(private commentRepository: ICommentRepository) {}

    async createComment(commentData: IComment): Promise<IComment> {
        return this.commentRepository.create(commentData)
    }

    async getCommentById(id: string): Promise<IComment | null> {
        return this.commentRepository.findById(id)
    }
    async getCommentByUserId(userId: string): Promise<IComment[]> {
        return this.commentRepository.findByUserId(userId)
    }

    async getAllCommentsByPost(postId: string): Promise<IComment[]> {
        return this.commentRepository.getAllByPost(postId)
    }

    async updateComment(
        id: string,
        commentData: Partial<IComment>
    ): Promise<IComment | null> {
        return this.commentRepository.update(id, commentData)
    }

    async deleteComment(id: string): Promise<boolean> {
        return this.commentRepository.delete(id)
    }
}
