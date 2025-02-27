import { CommentUseCase } from "../../application/usecases/comment.usecase"
import { CommentController } from "../../interfaces/controllers/commentController"
import { CommentRepositoryMongo } from "../repositories/commentRepositoryMongo"

export const createCommentController = (): CommentController => {
    const commentRepository = new CommentRepositoryMongo()
    const commentUseCase = new CommentUseCase(commentRepository)
    return new CommentController(commentUseCase)
}
