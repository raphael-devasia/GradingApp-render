import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

// Middleware to check the authorization
const authorize = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    
    
    

    if (!token) {
        res.status(401).send({ message: "Access Denied: No Token Provided" })
    } else {
        try {
            console.log(process.env.JWT_SECRET, token)
            // Verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "")

            next()
        } catch (error) {
            console.log("failed")

            res.status(400).send({ message: "Invalid Token" })
        }
    }
}

export default authorize
