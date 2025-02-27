import { Request, Response } from "express"
import { CommentUseCase } from "../../application/usecases/comment.usecase"

export class CommentController {
    constructor(private commentUseCase: CommentUseCase) {}

    async createComment(req: Request, res: Response): Promise<void> {
        try {
            const comment = await this.commentUseCase.createComment(req.body)
            res.status(201).json({ success: true, data: comment })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }

    async getCommentsByPostId(req: Request, res: Response): Promise<void> {
        try {
            const comments = await this.commentUseCase.getAllCommentsByPost(
                req.params.postId
            )
            res.status(200).json({ success: true, data: comments })
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
    async getCommentsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const comments = await this.commentUseCase.getCommentByUserId(
                req.params.userId
            )
            res.status(200).json({ success: true, data: comments })
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

    async deleteComment(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await this.commentUseCase.deleteComment(
                req.params.id
            )
            if (isDeleted) {
                res.status(200).json({
                    success: true,
                    message: "Comment deleted",
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Comment not found",
                })
            }
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
}
