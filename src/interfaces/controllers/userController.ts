import { Request, Response } from "express"
import { UserUseCase } from "../../application/usecases/user.usecase"
import { HttpStatus } from "../../domain/models/http-status.enum"

import jwt from "jsonwebtoken" // for JWT token generation

export class UserController {
    constructor(private userUseCase: UserUseCase) {}

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userUseCase.createUser(req.body)
            

             const token = jwt.sign(
                        { id: user._id, email: user.email }, // Payload: Include user ID and email
                        process.env.JWT_SECRET || "", // Secret key for signing the JWT token
                        { expiresIn: "1h" } // Expiry time for the token
                    )

            res.status(HttpStatus.OK).json({
                success: true,
                token,
                userId: user._id,
            })
        } catch (error: any) {
            console.error("Create user error:", error.message || error)
            const status =
                error.message === "Email already in use"
                    ? HttpStatus.BAD_REQUEST
                    : HttpStatus.INTERNAL_SERVER_ERROR
            res.status(status).json({
                success: false,
                error: error.message || "Failed to create user",
            })
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const users = await this.userUseCase.login(email, password)
            res.status(HttpStatus.OK).json({ success: true, data: users })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            })
        }
    }

    async updatePlan(req: Request, res: Response): Promise<void> {
        try {
            const { plan, billingCycle, userId } = req.body
            

            if (!userId) {
                res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: "Unauthorized",
                })
                return
            }

            const result = await this.userUseCase.updatePlan(
                plan,
                billingCycle,
                userId
            )
            res.status(HttpStatus.OK).json({ success: true })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || "Failed to update plan",
            })
        }
    }
}
