import { ICourse } from "../models/course.interface"

export interface ICourseRepository {
    create(course: ICourse): Promise<ICourse>
    findById(courseId: string): Promise<ICourse | null>
    
    getAllCourses(): Promise<ICourse[]>
    getAllUserCourses(userId: string): Promise<ICourse[]>
    update(courseId: string, iPosICourse: Partial<ICourse>): Promise<ICourse | null>
    patch(courseId: string, iPosICourse: Partial<ICourse>): Promise<ICourse | null>
    delete(courseId: string): Promise<boolean>
    getCoursesByCategory(categoryId: string): Promise<ICourse[]>
    
}
