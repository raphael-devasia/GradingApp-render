import { ClassroomUseCase } from "../../application/usecases/classRoom.usecase"
import { UserUseCase } from "../../application/usecases/user.usecase"
import { UserController } from "../../interfaces/controllers/userController"
import { ClassroomRepositoryMongo } from "../repositories/ClassroomRepositoryMongo"
import { UserRepositoryMongo } from "../repositories/userRepositoryMongo"

export const createUserController = (): UserController => {
    const userRepository = new UserRepositoryMongo()
    const classRoomRepository = new ClassroomRepositoryMongo()
    const userUseCase = new UserUseCase(userRepository, classRoomRepository)
    const classroomUseCase = new ClassroomUseCase(classRoomRepository)

    return new UserController(userUseCase, classroomUseCase)
}
