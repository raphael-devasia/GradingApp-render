import { IUser } from "../models/user.interface"

export interface IUserRepository {
    create(user: IUser): Promise<IUser>
    findById(id: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
    update(id: string, iUIUser: Partial<IUser>): Promise<IUser | null>
    delete(id: string): Promise<boolean>
    getAll(): Promise<IUser[]>
    login(email: string, password: string): Promise<IUser | null>
}
