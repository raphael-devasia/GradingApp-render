import { IAssignment } from "../models/assignment.interface";


export interface IAssignmentRepository {
    createAssignment(
        prompt: string,
        assignmentDetails: Partial<IAssignment>,
        fileContent?: string
    ): Promise<Partial<IAssignment>>
     getAllUserAssignments(userId: string): Promise<IAssignment[]>
}
