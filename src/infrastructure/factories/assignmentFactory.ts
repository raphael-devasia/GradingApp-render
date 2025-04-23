

import { AssignmentContentService } from "../../application/assignment-content-service"
import { AssignmentContentValidator } from "../../application/assignment-content-validator"
import { MockAIProvider } from "../../application/mock-ai-provider"
import { AssignmentUseCase } from "../../application/usecases/assignment.usecase"
import { AssignmentController } from "../../interfaces/controllers/assignmentController"
import { AssignmentRepositoryMongo } from "../repositories/assignmentRepositoryMongo"


export const createAssignmentController = (): AssignmentController => {
    
    const mockAiProvider = new MockAIProvider()
    const assignmentContentValidator = new AssignmentContentValidator()
    const assignmentRepository = new AssignmentRepositoryMongo()
    const assignmentContentService = new AssignmentContentService(mockAiProvider,assignmentContentValidator)
    const assignmentUseCase = new AssignmentUseCase(
        assignmentContentService,
        assignmentRepository
    )
    return new AssignmentController(assignmentUseCase)
}
