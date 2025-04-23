import bcrypt from "bcrypt" // for password hashing
import jwt from "jsonwebtoken" // for JWT token generation
import { IUserRepository } from "../../domain/repositories/userRepository.interface"
import { IUser } from "../../domain/models/user.interface"
import { ILoginResponse, IUpdatePlanResponse } from "../../domain/models/loginResponse.interface"

export class UserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async createUser(userData: IUser): Promise<IUser> {
        // Validate inputs
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error("Name, email, and password are required")
        }
        if (userData.password.length < 8) {
            throw new Error("Password must be at least 8 characters")
        }

        // Check if user exists
        const existingUser = await this.userRepository.findByEmail(
            userData.email
        )
        if (existingUser) {
            throw new Error("Email already in use")
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword

        // Create user
        const user = await this.userRepository.create(userData)
        return user
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return this.userRepository.findByEmail(email)
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

    async updatePlan(
        plan: string,
        billingCycle: string,
        userId: string
    ): Promise<IUpdatePlanResponse> {
        try {
            // Validate inputs
            const validPlans = ["educator", "department", "institution"]
            const validBillingCycles = ["monthly", "yearly"]
            if (!validPlans.includes(plan)) {
                throw new Error("Invalid plan")
            }
            if (!validBillingCycles.includes(billingCycle)) {
                throw new Error("Invalid billing cycle")
            }

            // Update user in repository
            const user = await this.userRepository.updatePlan(
                plan,
                billingCycle,
                userId
            )
            return { success: true, user }
        } catch (error: any) {
            throw new Error(error.message || "Failed to update plan")
        }
    }
}
