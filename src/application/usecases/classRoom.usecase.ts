import { IClassroom } from "../../domain/models/classroom.model"
import { IUser } from "../../domain/models/user.interface"
import { IClassroomRepository } from "../../domain/repositories/classroomRepository"


export class ClassroomUseCase {
    constructor(private classroomRepository: IClassroomRepository) {}

    async findClassrooms(teacherId: string): Promise<IClassroom[]> {
        return this.classroomRepository.findClassrooms(teacherId)
    }

    async addStudent(
        classroomId: string,
        student: Partial<IUser>
    ): Promise<IUser> {
        return this.classroomRepository.addStudent(classroomId, student)
    }

    async addCoTeacher(
        classroomId: string,
        coTeacher: Partial<IUser>
    ): Promise<IUser> {
        return this.classroomRepository.addCoTeacher(classroomId, coTeacher)
    }

    async getStudents(classroomId: string): Promise<IUser[]> {
        return this.classroomRepository.getStudents(classroomId)
    }

    async getCoTeachers(classroomId: string): Promise<IUser[]> {
        return this.classroomRepository.getCoTeachers(classroomId)
    }
}
