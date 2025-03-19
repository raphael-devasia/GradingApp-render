import { Request, Response } from "express"
import { UserUseCase } from "../../application/usecases/user.usecase"
import { HttpStatus } from "../../domain/models/http-status.enum"

export class UserController {
    constructor(private userUseCase: UserUseCase) {}

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userUseCase.createUser(req.body)
            res.status(HttpStatus.OK).json({ success: true, data: user })
        } catch (error: any) {
            res.status(HttpStatus.NOT_FOUND).json({ success: false, message: error.message })
        }
    }

 

   
    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const users = await this.userUseCase.login(email, password)
            res.status(HttpStatus.OK).json({ success: true, data: users })
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
        }
    }
}
