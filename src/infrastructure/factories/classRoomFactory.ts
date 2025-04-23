import { ClassroomUseCase } from "../../application/usecases/classRoom.usecase"
import { ClassRoomController } from "../../interfaces/controllers/classRoomController"
import { ClassroomRepositoryMongo } from "../repositories/ClassroomRepositoryMongo"



export const createClassRoomController = (): ClassRoomController => {
    const classRoomRepository = new ClassroomRepositoryMongo()
    const classRoomUseCase = new ClassroomUseCase(classRoomRepository)
    return new ClassRoomController(classRoomUseCase)
}
