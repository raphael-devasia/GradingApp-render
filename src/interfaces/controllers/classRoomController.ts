import { Request, Response } from "express"

import { HttpStatus } from "../../domain/models/http-status.enum" 
import { IUser } from "../../domain/models/user.interface"
import { ClassroomUseCase } from "../../application/usecases/classRoom.usecase"





export class ClassRoomController {
    constructor(private classroomUseCase: ClassroomUseCase) {}

    async findClassrooms(req: Request, res: Response): Promise<void> {
        try {
           
            
            const  teacherId  = req.params.userId
            if (!teacherId || typeof teacherId !== "string") {
                throw new Error("Teacher ID is required")
            }
            const classrooms = await this.classroomUseCase.findClassrooms(
                teacherId
            )
            
            
            res.status(HttpStatus.OK).json({success: true,data:classrooms})
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async addStudent(req: Request, res: Response): Promise<void> {
        try {
            const { classroomId, name, email } = req.body
            if (!classroomId || !name || !email) {
                throw new Error("Classroom ID, name, and email are required")
            }
            const student: Partial<IUser> = { name, email }
            const newStudent = await this.classroomUseCase.addStudent(
                classroomId,
                student
            )
            res.status(HttpStatus.CREATED).json({
                success: true,
                data: newStudent,
            })
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async addCoTeacher(req: Request, res: Response): Promise<void> {
        try {
            const { classroomId, name, email } = req.body
            if (!classroomId || !name || !email) {
                throw new Error("Classroom ID, name, and email are required")
            }
            const coTeacher: Partial<IUser> = { name, email }
            const newCoTeacher = await this.classroomUseCase.addCoTeacher(
                classroomId,
                coTeacher
            )
            res.status(HttpStatus.CREATED).json({
                success: true,
                data: newCoTeacher,
            })
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getStudents(req: Request, res: Response): Promise<void> {
        try {
            const { classroomId } = req.query
            console.log('the classroom id is ',classroomId);
            
            if (!classroomId || typeof classroomId !== "string") {
                throw new Error("Classroom ID is required")
            }
            const students = await this.classroomUseCase.getStudents(
                classroomId
            )
            
            
            res.status(HttpStatus.OK).json({success:true,data:students})
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getCoTeachers(req: Request, res: Response): Promise<void> {
        try {
            const { classroomId } = req.query
            if (!classroomId || typeof classroomId !== "string") {
                throw new Error("Classroom ID is required")
            }
            const coTeachers = await this.classroomUseCase.getCoTeachers(
                classroomId
            )
            res.status(HttpStatus.OK).json(coTeachers)
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }
}
