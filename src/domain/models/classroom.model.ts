export interface IClassroom {
    id?: string
    
    teacherId: any 
    coTeacherIds: string[] 
    studentIds: string[]
    createdAt?: Date
    updatedAt?: Date
}
