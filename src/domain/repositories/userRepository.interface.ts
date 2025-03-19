import { IUser } from "../models/user.interface"

export interface IUserRepository {
    create(user: IUser): Promise<IUser>
    
    findByEmail(email: string): Promise<IUser | null>
    
    
    login(email: string, password: string): Promise<IUser | null>
}
