import { Request, Response } from "express"
import { PostUseCase } from "../../application/usecases/post.usecase"

export class PostController {
    constructor(private postUseCase: PostUseCase) {}

    async createPost(req: Request, res: Response): Promise<void> {
        try {
            const post = await this.postUseCase.createPost(req.body)
            res.status(201).json({ success: true, data: post })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }

    async getPost(req: Request, res: Response): Promise<void> {
        console.log("getPostById1")
        try {
            const post = await this.postUseCase.getPostById(req.params.id)
            if (post) {
                res.status(200).json({ success: true, data: post })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Post not found",
                })
            }
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const updatedPost = await this.postUseCase.updatePost(
                req.params.id,
                req.body
            )
            if (updatedPost) {
                res.status(200).json({ success: true, data: updatedPost })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Post not found",
                })
            }
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
    async patchPost(req: Request, res: Response): Promise<void> {
        try {
            const updatedPost = await this.postUseCase.patchPost(
                req.params.id,
                req.body
            )
            if (updatedPost) {
                res.status(200).json({ success: true, data: updatedPost })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Post not found",
                })
            }
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await this.postUseCase.deletePost(req.params.id)
            if (isDeleted) {
                res.status(200).json({ success: true, message: "Post deleted" })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Post not found",
                })
            }
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

    async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            
            const posts = await this.postUseCase.getAllPosts()
            res.status(200).json({ success: true, data: posts })
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
    async getAllUserPosts(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id
            const posts = await this.postUseCase.getAllUserPosts(userId)
            res.status(200).json({ success: true, data: posts })
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

    async uploadImage(req: Request, res: Response): Promise<void> {
        console.log(req.file)

        try {
            const file = req.file // Extract the file from the request

            if (!file) {
                res.status(400).json({ error: "No file provided" })
            } else {
                const imageUrl = await this.postUseCase.uploadImage(
                    file.buffer,
                    file.originalname,
                    file.mimetype
                )

                res.status(200).json({ imageUrl })
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    async getPresignedUrl(req: Request, res: Response): Promise<void> {
        try {
            const fileName = req.query.fileName as string
            const url = await this.postUseCase.getUrl(fileName)
            console.log(url)

            res.status(200).json({
                success: true,
                presignedUrl: url?.presignedUrl,
                fileUrl: url?.fileUrl,
            })
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
}
