import { ASSIGNMENT_TYPES } from "../domain/models/assignment-types"
import { IAssignment } from "../domain/models/assignment.interface"
import { IAIProvider } from "../domain/repositories/ai-provider.interface"


export class MockAIProvider implements IAIProvider {
    async generateAssignmentContent(
        prompt: string,
        assignmentDetails: Partial<IAssignment>,
        fileContent?: string
    ): Promise<Partial<IAssignment>> {
        console.log("Mock LLM called for assignment content generation")

        // Simulate API latency (1-3 seconds)
        const latency = Math.random() * 2000 + 1000
        await new Promise((resolve) => setTimeout(resolve, latency))

        // Handle undefined type
        const assignmentType = assignmentDetails.type || ASSIGNMENT_TYPES.ESSAY 
        if (!Object.values(ASSIGNMENT_TYPES).includes(assignmentType)) {
            throw new Error(`Invalid assignment type: ${assignmentType}`)
        }

        // Handle undefined title
        const title = assignmentDetails.title || "Untitled Assignment"

        // Determine response type (normal, off-topic, incomplete, incorrect)
        const responseType = Math.random()
        const isOffTopic = responseType < 0.1
        const isIncomplete = responseType >= 0.1 && responseType < 0.2
        const isIncorrect = responseType >= 0.2 && responseType < 0.3

        // Base content
        let content: Partial<IAssignment> = {
            instructions: `Instructions for ${title}: Complete the ${assignmentType} based on the provided guidelines.`,
            rubric: `Rubric for ${title}: Content (40%), Organization (30%), Clarity (20%), Grammar (10%).`,
        }

        // Add type-specific outputs
        if (
            [
                ASSIGNMENT_TYPES.MULTIPLE_CHOICE,
                ASSIGNMENT_TYPES.SHORT_ANSWER,
            ].includes(
                assignmentType as (typeof ASSIGNMENT_TYPES)[
                    | "MULTIPLE_CHOICE"
                    | "SHORT_ANSWER"]
            )
        ) {
            content.questions = `Sample question for ${title}: What is the main topic?`
            content.answerKey = `Answer key for ${title}: Correct answer is X.`
        }
        if (assignmentType === ASSIGNMENT_TYPES.LAB_REPORT) {
            content.checklist = `Checklist for ${title}: Title, Abstract, Methods, Results, Discussion.`
        }
        if (assignmentType === ASSIGNMENT_TYPES.DISCUSSION) {
            content.participationCriteria = `Participation criteria for ${title}: Engage actively, respond to peers.`
        }
        if (assignmentType === ASSIGNMENT_TYPES.GROUP_PROJECT) {
            content.peerEvaluation = `Peer evaluation for ${title}: Rate contributions (1-5).`
        }

        // Incorporate file content
        if (fileContent) {
            content.instructions += ` (Based on uploaded content: ${fileContent.slice(
                0,
                50
            )}...)`
        }

        // Simulate edge cases
        if (isOffTopic) {
            content.instructions = "Instructions for an unrelated assignment."
            content.rubric = "Rubric for an unrelated topic."
        }
        if (isIncomplete) {
            content.instructions = undefined
            content.rubric = undefined
        }
        if (isIncorrect) {
            content.rubric = `Rubric with incorrect grading: Content (60%), Organization (50%).`
        }

        // Basic relevance check
        const isRelevant = prompt.toLowerCase().includes(title.toLowerCase())
        if (!isRelevant && !isOffTopic) {
            throw new Error("Prompt is not relevant to the assignment.")
        }

        return content
    }
}
