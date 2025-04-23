import { ICourse } from "../../domain/models/course.interface"
import { ICourseRepository } from "../../domain/repositories/courseRepository";


export class CourseUseCase {
    constructor(private courseRepository: ICourseRepository) {}

    async createCourse(courseData: ICourse): Promise<ICourse> {
        return this.courseRepository.create(courseData)
    }

    async getCourseById(courseId: string): Promise<ICourse | null> {
        return this.courseRepository.findById(courseId)
    }
    

    async getCoursesByCategory(categoryId: string): Promise<ICourse[]> {
        return this.courseRepository.getCoursesByCategory(categoryId)
    }

    async updateCourse(
        courseId: string,
        courseData: Partial<ICourse>
    ): Promise<ICourse | null> {
        return this.courseRepository.update(courseId, courseData)
    }
    async patchCourse(
        courseId: string,
        courseData: Partial<ICourse>
    ): Promise<ICourse | null> {
        return this.courseRepository.patch(courseId, courseData)
    }

    async deleteCourse(courseId: string): Promise<boolean> {
        return this.courseRepository.delete(courseId)
    }

    async getAllCourses(): Promise<ICourse[]> {
        return this.courseRepository.getAllCourses()
    }
    async getAllUserCourses(userId: string): Promise<ICourse[]> {
        return this.courseRepository.getAllUserCourses(userId)
    }

   
}
