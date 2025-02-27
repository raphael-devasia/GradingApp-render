import { Request, Response } from "express"
import { UserUseCase } from "../../application/usecases/user.usecase"

export class UserController {
    constructor(private userUseCase: UserUseCase) {}

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userUseCase.createUser(req.body)
            res.status(201).json({ success: true, data: user })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userUseCase.getUserById(req.params.id)
            if (user) {
                res.status(200).json({ success: true, data: user })
            } else {
                res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const updatedUser = await this.userUseCase.updateUser(
                req.params.id,
                req.body
            )
            if (updatedUser) {
                res.status(200).json({ success: true, data: updatedUser })
            } else {
                res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await this.userUseCase.deleteUser(req.params.id)
            if (isDeleted) {
                res.status(200).json({ success: true, message: "User deleted" })
            } else {
                res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userUseCase.getAllUsers()
            res.status(200).json({ success: true, data: users })
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const users = await this.userUseCase.login(email, password)
            res.status(200).json({ success: true, data: users })
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
}
