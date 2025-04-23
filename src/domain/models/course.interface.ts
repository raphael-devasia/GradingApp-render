
import { Syllabus } from "./syllabus.interface"

export interface ICourse {
    id: any
    userId:any
    name: string
    description: string
    subject: string
    gradeLevel: string
    students: number
    assignments: number
    syllabus?: Syllabus
}

export interface ICourseInput {
    name: string
    userId: string
    description: string
    subject: string
    gradeLevel: string
    syllabus?: Syllabus
}
