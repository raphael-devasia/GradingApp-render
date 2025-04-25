
import { IClassroom } from "../../domain/models/classroom.model"
import { ICoTeacher } from "../../domain/models/co-teacher.model"
import { IStudent } from "../../domain/models/students.model"
import { IClassroomRepository } from "../../domain/repositories/classroomRepository"

export class ClassroomUseCase {
    constructor(private classroomRepository: IClassroomRepository) {}

    async findClassrooms(teacherId: string): Promise<IClassroom | null> {
        return this.classroomRepository.findByTeacherId(teacherId)
    }

    async addStudent(
        classroomId: string,
        student: Partial<IStudent>
    ): Promise<IStudent> {
        // Validate student data
        if (!student.email || !student.name) {
            throw new Error("Student email and name are required")
        }
        // Set default classes if not provided
        student.classes = student.classes || ["all"]
        return this.classroomRepository.addStudent(classroomId, student)
    }

    async addCoTeacher(
        classroomId: string,
        coTeacher: Partial<ICoTeacher>
    ): Promise<ICoTeacher> {
        // Validate co-teacher data
        if (!coTeacher.email || !coTeacher.name) {
            throw new Error("Co-teacher email and name are required")
        }
        // Set default classes and status
        coTeacher.classes = coTeacher.classes || ["all"]
        coTeacher.status = coTeacher.status || "pending"
        return this.classroomRepository.addCoTeacher(classroomId, coTeacher)
    }

    async getStudents(classroomId: string): Promise<IStudent[]> {
        return this.classroomRepository.getStudents(classroomId)
    }

    async getCoTeachers(classroomId: string): Promise<ICoTeacher[]> {
        return this.classroomRepository.getCoTeachers(classroomId)
    }
    async findByTeacherId(teacherId: string): Promise<IClassroom | null> {
        return this.classroomRepository.findByTeacherId(teacherId)
    }
}
