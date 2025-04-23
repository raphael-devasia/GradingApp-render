import { Request, Response } from "express"

import { HttpStatus } from "../../domain/models/http-status.enum" // Adjust path as needed
import { CourseMessages } from "../../domain/models/ResponseMessage.enum"
import { CourseUseCase } from "../../application/usecases/course.usecase";


export class CourseController {
    constructor(private courseUseCase: CourseUseCase) {}

    async createCourse(req: Request, res: Response): Promise<void> {
        
        
        try {
           

            const course = await this.courseUseCase.createCourse(req.body)
            res.status(HttpStatus.CREATED).json({ success: true, data: course })
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getCourse(req: Request, res: Response): Promise<void> {
        
        try {
            const course = await this.courseUseCase.getCourseById(req.params.id)
            if (course) {
                res.status(HttpStatus.OK).json({ success: true, data: course })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: CourseMessages.NOT_FOUND,
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async updateCourse(req: Request, res: Response): Promise<void> {
        try {
            const updatedCourse = await this.courseUseCase.updateCourse(
                req.params.id,
                req.body
            )
            if (updatedCourse) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: updatedCourse,
                })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: CourseMessages.NOT_FOUND,
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async patchCourse(req: Request, res: Response): Promise<void> {
        try {
            const updatedCourse = await this.courseUseCase.patchCourse(
                req.params.id,
                req.body
            )
            if (updatedCourse) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: updatedCourse,
                })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: CourseMessages.NOT_FOUND,
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async deleteCourse(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await this.courseUseCase.deleteCourse(req.params.id)
            if (isDeleted) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    message: CourseMessages.COURSE_DELETED,
                })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: CourseMessages.NOT_FOUND,
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getAllCourses(req: Request, res: Response): Promise<void> {
        try {
            const courses = await this.courseUseCase.getAllCourses()
            res.status(HttpStatus.OK).json({ success: true, data: courses })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getAllUserCourses(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId
            const courses = await this.courseUseCase.getAllUserCourses(userId)
            res.status(HttpStatus.OK).json({ success: true, data: courses })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    

    }
