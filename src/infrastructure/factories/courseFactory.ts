
import { CourseUseCase } from "../../application/usecases/course.usecase"
import { CourseController } from "../../interfaces/controllers/courseController"
import { CourseRepositoryMongo } from "../repositories/courseRepositoryMongo"

export const createCourseController = (): CourseController => {
    const courseRepository = new CourseRepositoryMongo()
    const courseUseCase = new CourseUseCase(courseRepository)
    return new CourseController(courseUseCase)
}
