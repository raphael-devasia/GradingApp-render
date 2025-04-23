import { IAssignment } from "../../domain/models/assignment.interface"
import { IAssignmentRepository } from "../../domain/repositories/assignmentRepository"
import AssignmentModel from '../db/models/assignment.model'

import mongoose from "mongoose"

export class AssignmentRepositoryMongo implements IAssignmentRepository {
   async  getAllUserAssignments(userId: string): Promise<IAssignment[]> {
         try {
            

             // Fetch assignments filtered by userId and populate course details
             const assignments = await AssignmentModel.find({ userId: userId })
                 .populate({
                     path: "courseId",
                     select: "name description", 
                 })
                 .lean() 

             // Map the results to include courseName
             return assignments.map((assignment) => ({
                 ...assignment,
                 id:assignment._id,
                 courseName: assignment.courseId?.name || "", 
                 courseId: assignment.courseId?._id.toString() || "", 
             }))
         } catch (error: any) {
             console.error("Error fetching assignments:", error.message)
             throw new Error(
                 "Failed to fetch assignments. Please try again later."
             )
         }
    }
    async createAssignment(
        prompt: string,
        assignmentDetails: Partial<IAssignment>,
        fileContent?: string
    ): Promise<Partial<IAssignment>> {
        try {
            // Validate ObjectId fields
            if (
                assignmentDetails.courseId &&
                !mongoose.Types.ObjectId.isValid(assignmentDetails.courseId)
            ) {
                throw new Error("Invalid course ID format")
            }
            if (
                assignmentDetails.userId &&
                !mongoose.Types.ObjectId.isValid(assignmentDetails.userId)
            ) {
                throw new Error("Invalid user ID format")
            }

            // Create a new assignment document
            const assignment = new AssignmentModel(assignmentDetails)

            // Save to database
            const savedAssignment = await assignment.save()

            // Apply toJSON transformation to match Partial<IAssignment>
            const result = savedAssignment.toJSON() as Partial<IAssignment>

            return result
        } catch (error: any) {
            throw new Error(`Failed to create assignment: ${error.message}`)
        }
    }
}
