import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { HttpStatus } from "../../domain/models/http-status.enum"
import { AuthMessages } from "../../domain/models/ResponseMessage.enum"

interface JwtPayload {
    id: string
    email: string
}

// Middleware to check authorization and attach userId
const authorize = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    
    

    if (!token) {

        
        
        res.status(HttpStatus.UNAUTHORIZED).send({
            message: AuthMessages.NO_TOKEN,
        })
        return
    }

    try {
       
        // Verify the token using the secret key
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || ""
        ) as JwtPayload

        // Attach userId to req.body

        
        
         if (req.method === "GET") {
             // Add to params (can be read in GET routes)
             
             
             req.params.userId = decoded.id
             
         } else {
            console.log(" th euser id is ", decoded)
             // Add to body (POST, PUT, DELETE, etc.)
             req.body.userId = decoded.id
             
         }

        
        
        

        next()
    } catch (error) {
        console.error("Authorization error:", error)
        res.status(HttpStatus.BAD_REQUEST).send({
            message: AuthMessages.INVALID_TOKEN,
        })
    }
}

export default authorize
