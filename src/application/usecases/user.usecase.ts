import bcrypt from "bcrypt" // for password hashing
import jwt from "jsonwebtoken" // for JWT token generation
import { IUserRepository } from "../../domain/repositories/userRepository.interface"
import { IUser } from "../../domain/models/user.interface"
import { ILoginResponse } from "../../domain/models/loginResponse.interface"

export class UserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async createUser(userData: IUser): Promise<IUser> {
        // Business logic for creating a user
        const existingUser = await this.userRepository.findByEmail(
            userData.email
        )
        if (existingUser) {
            throw new Error("Email already in use")
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(userData.password, 10) // 10 is the salt rounds

        // Replace the password in userData with the hashed password
        userData.password = hashedPassword

        return this.userRepository.create(userData)
    }

    async getUserById(id: string): Promise<IUser | null> {
        return this.userRepository.findById(id)
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return this.userRepository.findByEmail(email)
    }

    async updateUser(
        id: string,
        userData: Partial<IUser>
    ): Promise<IUser | null> {
        return this.userRepository.update(id, userData)
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id)
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.userRepository.getAll()
    }
    async login(email: string, password: string): Promise<ILoginResponse> {
        // Find user by email
        const user = await this.userRepository.login(email, password)

        // If user doesn't exist, throw an error
        if (!user) {
            throw new Error("User is not registered")
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password)

        // If password doesn't match, throw an error
        if (!isMatch) {
            throw new Error("Invalid credentials")
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload: Include user ID and email
            process.env.JWT_SECRET || "", // Secret key for signing the JWT token
            { expiresIn: "1h" } // Expiry time for the token
        )

        // Construct the ILoginResponse object
        const loginResponse: ILoginResponse = {
            token: token,
            message: "Login successful",
            expiresIn: 3600, // Token expiration time in seconds
            userId: user._id.toString(), // Convert MongoDB ObjectID to string
            email: user.email,
            firstName: user.firstName, // Assuming user has firstName field
            lastName: user.lastName, // Assuming user has lastName field
        }

        // Return the login response
        return loginResponse
    }
}
