import { UserUseCase } from "../../application/usecases/user.usecase"
import { UserController } from "../../interfaces/controllers/userController"
import { UserRepositoryMongo } from "../repositories/userRepositoryMongo"

export const createUserController = (): UserController => {
    const userRepository = new UserRepositoryMongo()
    const userUseCase = new UserUseCase(userRepository)
    return new UserController(userUseCase)
}
