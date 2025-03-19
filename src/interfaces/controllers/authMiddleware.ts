import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { HttpStatus } from "../../domain/models/http-status.enum"
import { AuthMessages } from "../../domain/models/ResponseMessage.enum"

// Middleware to check the authorization
const authorize = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        res.status(HttpStatus.UNAUTHORIZED).send({
            message: AuthMessages.NO_TOKEN,
        })
    } else {
        try {
            
            // Verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "")

            next()
        } catch (error) {
            console.log('authorization error');
            
            res.status(HttpStatus.BAD_REQUEST).send({
                message: AuthMessages.INVALID_TOKEN,
            })
        }
    }
}

export default authorize
