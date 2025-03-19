import { Request, Response } from "express"
import { CommentUseCase } from "../../application/usecases/comment.usecase"
import { HttpStatus } from "../../domain/models/http-status.enum"
import { ResponseMessage } from "../../domain/models/ResponseMessage.enum"

export class CommentController {
    constructor(private commentUseCase: CommentUseCase) {}

    async createComment(req: Request, res: Response): Promise<void> {
        try {
            const comment = await this.commentUseCase.createComment(req.body)
            res.status(HttpStatus.CREATED).json({
                success: true,
                data: comment,
            })
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getCommentsByPostId(req: Request, res: Response): Promise<void> {
        try {
            const comments = await this.commentUseCase.getAllCommentsByPost(
                req.params.postId
            )
            res.status(HttpStatus.OK).json({ success: true, data: comments })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getCommentsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const comments = await this.commentUseCase.getCommentByUserId(
                req.params.userId
            )
            res.status(HttpStatus.OK).json({ success: true, data: comments })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async deleteComment(req: Request, res: Response): Promise<void> {
        
        
        try {
            const isDeleted = await this.commentUseCase.deleteComment(
                req.params.commentId
            )
            if (isDeleted) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    message: ResponseMessage.COMMENT_DELETED,
                })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: ResponseMessage.COMMENT_NOT_FOUND,
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }
}
