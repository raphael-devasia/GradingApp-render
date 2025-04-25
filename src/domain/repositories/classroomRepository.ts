import { IClassroom } from "../models/classroom.model"
import { ICoTeacher } from "../models/co-teacher.model"
import { IStudent } from "../models/students.model"


export interface IClassroomRepository {
    findClassrooms(teacherId: string): Promise<IClassroom[] | null>
    addStudent(
        classroomId: string,
        student: Partial<IStudent>
    ): Promise<IStudent>
    addCoTeacher(
        classroomId: string,
        coTeacher: Partial<ICoTeacher>
    ): Promise<ICoTeacher>
    getStudents(classroomId: string): Promise<IStudent[]>
    getCoTeachers(classroomId: string): Promise<ICoTeacher[]>
    createClassRoom(teacherId: string): Promise<IClassroom>
    findByTeacherId(teacherId: string): Promise<IClassroom | null>
}
