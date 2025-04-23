import { IAssignment } from "../models/assignment.interface";


export interface IAIProvider {
    generateAssignmentContent(
        prompt: string,
        assignmentDetails: Partial<IAssignment>,
        fileContent?: string
    ): Promise<Partial<IAssignment>>
}
