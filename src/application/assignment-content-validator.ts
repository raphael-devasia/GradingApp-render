import { z } from "zod"
import { IAssignment } from "../domain/models/assignment.interface"

const assignmentContentSchema = z.object({
    instructions: z.string().optional(),
    rubric: z.string().optional(),
    questions: z.string().optional(),
    answerKey: z.string().optional(),
    checklist: z.string().optional(),
    participationCriteria: z.string().optional(),
    peerEvaluation: z.string().optional(),
})

export class AssignmentContentValidator {
    validate(
        content: Partial<IAssignment>,
        assignmentType: string,
        title: string
    ): void {
        const errors: string[] = []

        // Schema validation
        try {
            assignmentContentSchema.parse(content)
        } catch (error: any) {
            errors.push(`Schema validation failed: ${error.message}`)
        }

        // Business rule validation
        if (
            !content.instructions &&
            !["multiple_choice", "short_answer"].includes(assignmentType)
        ) {
            errors.push("Missing instructions")
        }
        if (
            !content.rubric &&
            !["multiple_choice", "short_answer"].includes(assignmentType)
        ) {
            errors.push("Missing rubric")
        }
        if (content.rubric?.includes("incorrect grading")) {
            errors.push("Rubric percentages sum to more than 100%")
        }
        if (content.instructions?.includes("unrelated")) {
            errors.push("Content is off-topic")
        }

        if (errors.length) {
            throw new Error(`Validation failed: ${errors.join(", ")}`)
        }
    }
}
