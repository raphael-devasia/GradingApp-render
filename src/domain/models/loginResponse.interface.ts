import { IUser } from "./user.interface"

export interface ILoginResponse {
    token: string 
    message: string 
    expiresIn: number 
    userId?: string 
    email?: string 
    name?: string 
    
}

export interface IUpdatePlanResponse {
    success: boolean
    user?: IUser
}
