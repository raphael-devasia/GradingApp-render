import { ISubscription } from "./subscription.interface"

export interface IUser {
    _id: string
    name: string
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    role?: string
    subscription: ISubscription
    createdAt: Date
    token?:string
}
