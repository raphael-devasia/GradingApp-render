import { IClassroom } from "../models/classroom.model"
import { IUser } from "../models/user.interface"


export interface IClassroomRepository {
    findClassrooms(teacherId: string): Promise<IClassroom[]>
    addStudent(classroomId: string, student: Partial<IUser>): Promise<IUser>
    addCoTeacher(classroomId: string, coTeacher: Partial<IUser>): Promise<IUser>
    getStudents(classroomId: string): Promise<IUser[]>
    getCoTeachers(classroomId: string): Promise<IUser[]>
}
