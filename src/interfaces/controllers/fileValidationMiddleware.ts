import { log } from "console"
import { Request, Response, NextFunction } from "express"

// Custom middleware to validate the file before Multer processes it
const fileValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Check if req.file or req.files.image exists
    console.log(req)

    const file =
        req.file ||
        (req.files &&
            (req.files as { image?: Express.Multer.File[] }).image &&
            (req.files as { image: Express.Multer.File[] }).image[0])

    // If no file is provided, pass an error to the next middleware
    if (!file) {
        const error = new Error("No file provided") as any
        error.status = 400
        return next(error)
    }

    // Check if the file type is valid
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error(
            "Invalid file type. Only JPEG, PNG, and GIF are allowed."
        ) as any
        error.status = 400
        return next(error)
    }

    // Check if the file size exceeds 5MB
    if (file.size > 5 * 1024 * 1024) {
        const error = new Error("File size exceeds the 5MB limit") as any
        error.status = 400
        return next(error)
    }

    // Proceed to the next middleware if validation passes
    next()
}

export { fileValidationMiddleware }
