import { PostUseCase } from "../../application/usecases/post.usecase"
import { PostController } from "../../interfaces/controllers/PostController"
import { PostRepositoryMongo } from "../repositories/postRepositoryMongo"

export const createPostController = (): PostController => {
    const postRepository = new PostRepositoryMongo()
    const postUseCase = new PostUseCase(postRepository)
    return new PostController(postUseCase)
}
