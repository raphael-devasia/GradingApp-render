// uploadMiddleware.ts (optional, if you want to organize the multer config)
import multer from "multer"

// Configure multer to store files in memory
const storage = multer.memoryStorage()
const upload = multer({ storage })

export { upload }
