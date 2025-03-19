import { IUser } from "../../domain/models/user.interface"
import { IUserRepository } from "../../domain/repositories/userRepository.interface"
import User from "../db/models/user.model"

export class UserRepositoryMongo implements IUserRepository {
    async create(user: IUser): Promise<IUser> {
        try {
            console.log("Creating user:", user)

            // If no user is found, proceed with creating a new user
            const newUser = new User(user)
            console.log("New user:", newUser)

            return await newUser.save()
        } catch (error: any) {
            console.error("Error saving user:", error.message || error)
            throw new Error(error.message || "Error saving user")
        }
    }
    async findByEmail(email: string): Promise<IUser | null> {
        try {
            // Search for a user with the provided email
            const existingUser = await User.findOne({ email })
            return existingUser
        } catch (error) {
            console.error("Error finding user by email:", error)
            throw new Error("Error finding user")
        }
    }

   
    
    async login(email: string, password: string): Promise<IUser | null> {
        try {
            // Find user by email
            const user = await User.findOne({ email })

            // If user doesn't exist, throw an error
            if (!user) {
                throw new Error("Invalid credentials")
            }
            console.log("User found:", user)
            console.log(password)

            // Return the user if authentication is successful
            return user
        } catch (error) {
            console.error("Error fetching user by email:", error)
            throw new Error("User is not registered")
        }
    }
}
