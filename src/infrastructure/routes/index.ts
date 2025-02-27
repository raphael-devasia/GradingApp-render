import { Router } from "express"

import commentRoutes from "./commentRoutes"
import userRoutes from "./userRoutes"
import postRoutes from "./postRoutes"



const router: Router = Router()

router.use("/users", userRoutes)

router.use("/posts", postRoutes)
router.use("/comments", commentRoutes)



export default router
