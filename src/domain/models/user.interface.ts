import { ISubscription } from "./subscription.interface"

export interface IUser {
    _id: string
    name: string
    
    email: string
    password: string
   
    role?: string
    subscription: ISubscription
    createdAt: Date
    updatedAt: Date
    token?: string
    classroomId?: any
    googleId?: string
    microsoftId?: string
}
