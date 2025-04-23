import { Request, Response } from "express"

import { HttpStatus } from "../../domain/models/http-status.enum" // Adjust path as needed

import { AssignmentUseCase } from "../../application/usecases/assignment.usecase"
import mongoose from "mongoose"
import { ASSIGNMENT_TYPES } from "../../domain/models/assignment-types"



export class AssignmentController {
    constructor(private assignmentUseCase: AssignmentUseCase) {}

    async createAssignment(req: Request, res: Response): Promise<void> {
        try {
            const {
                title,
                courseId,
                type,
                dueDate,
                description,
                learningObjectives,
                instructions,
                rubric,
                questions,
                answerKey,
                checklist,
                participationCriteria,
                peerEvaluation,
                userId,
                prompt,
                fileContent,
            } = req.body

            // Derive default prompt if not provided
            const effectivePrompt =
                prompt ||
                `Create a ${type || "assignment"} titled "${
                    title || "Untitled"
                }" with description: ${
                    description || "No description provided"
                }.`

            // Construct assignmentData
            const assignmentData = {
                title,
                courseId,
                type,
                dueDate,
                description,
                learningObjectives,
                instructions,
                rubric,
                questions,
                answerKey,
                checklist,
                participationCriteria,
                peerEvaluation,
                userId,
            }

            // Validate required fields per AssignmentSchema
            if (!title) throw new Error("Title is required")
            if (!courseId) throw new Error("Course ID is required")
            if (!mongoose.Types.ObjectId.isValid(courseId)) {
                throw new Error("Invalid course ID format")
            }
            if (!type) throw new Error("Type is required")
            if (!Object.values(ASSIGNMENT_TYPES).includes(type)) {
                throw new Error(`Invalid assignment type: ${type}`)
            }
            if (!dueDate) throw new Error("Due date is required")
            if (!description) throw new Error("Description is required")
            if (!learningObjectives)
                throw new Error("Learning objectives are required")
            if (!userId) throw new Error("User ID is required")
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error("Invalid user ID format")
            }

            const assignment = await this.assignmentUseCase.createAssignment(
                effectivePrompt,
                assignmentData,
                fileContent
            )
            res.status(HttpStatus.CREATED).json({
                success: true,
                data: assignment,
            })
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async generateAssignmentContent(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const {
                prompt,
                title,
                courseId,
                type,
                dueDate,
                description,
                learningObjectives,
                userId,
                fileContent,
            } = req.body
            if (!prompt) {
                throw new Error("Prompt is required")
            }
            const assignmentData = {
                title,
                courseId,
                type,
                dueDate,
                description,
                learningObjectives,
                userId,
            }
            if (
                !Object.values(assignmentData).some(
                    (value) => value !== undefined && value !== null
                )
            ) {
                throw new Error("At least one assignmentData field is required")
            }
            const assignment =
                await this.assignmentUseCase.generateAssignmentContent(
                    prompt,
                    assignmentData,
                    fileContent
                )
            res.status(HttpStatus.CREATED).json({
                success: true,
                data: assignment,
            })
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getAllUserAssignments(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId
            const assignments = await this.assignmentUseCase.getAllUserAssignments(userId)
            res.status(HttpStatus.OK).json({ success: true, data: assignments })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }
}
