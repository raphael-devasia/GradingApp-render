import { Request, Response } from "express"
import { PostUseCase } from "../../application/usecases/post.usecase"
import { HttpStatus } from "../../domain/models/http-status.enum" // Adjust path as needed
import { PostMessages } from "../../domain/models/ResponseMessage.enum"

export class PostController {
    constructor(private postUseCase: PostUseCase) {}

    async createPost(req: Request, res: Response): Promise<void> {
        try {
            const post = await this.postUseCase.createPost(req.body)
            res.status(HttpStatus.CREATED).json({ success: true, data: post })
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getPost(req: Request, res: Response): Promise<void> {
        
        try {
            const post = await this.postUseCase.getPostById(req.params.id)
            if (post) {
                res.status(HttpStatus.OK).json({ success: true, data: post })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: PostMessages.NOT_FOUND,
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const updatedPost = await this.postUseCase.updatePost(
                req.params.id,
                req.body
            )
            if (updatedPost) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: updatedPost,
                })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: PostMessages.NOT_FOUND,
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async patchPost(req: Request, res: Response): Promise<void> {
        try {
            const updatedPost = await this.postUseCase.patchPost(
                req.params.id,
                req.body
            )
            if (updatedPost) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: updatedPost,
                })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: PostMessages.NOT_FOUND,
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await this.postUseCase.deletePost(req.params.id)
            if (isDeleted) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    message: PostMessages.POST_DELETED,
                })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: PostMessages.NOT_FOUND,
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await this.postUseCase.getAllPosts()
            res.status(HttpStatus.OK).json({ success: true, data: posts })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getAllUserPosts(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id
            const posts = await this.postUseCase.getAllUserPosts(userId)
            res.status(HttpStatus.OK).json({ success: true, data: posts })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async uploadImage(req: Request, res: Response): Promise<void> {
        console.log(req.file)
        try {
            const file = req.file
            if (!file) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    error: PostMessages.NO_FILE,
                })
            } else {
                const imageUrl = await this.postUseCase.uploadImage(
                    file.buffer,
                    file.originalname,
                    file.mimetype
                )
                res.status(HttpStatus.OK).json({ imageUrl })
            }
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            })
        }
    }

    async getPresignedUrl(req: Request, res: Response): Promise<void> {
        try {
            const fileName = req.query.fileName as string
            const url = await this.postUseCase.getUrl(fileName)
            console.log(url)
            res.status(HttpStatus.OK).json({
                success: true,
                presignedUrl: url?.presignedUrl,
                fileUrl: url?.fileUrl,
            })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }
}
