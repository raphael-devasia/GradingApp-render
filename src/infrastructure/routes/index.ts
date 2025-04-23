import { Router } from "express"

import commentRoutes from "./commentRoutes"
import userRoutes from "./userRoutes"
import postRoutes from "./postRoutes"
import courseRoutes from './courseRoutes'
import assignmentRoutes from './assignmentRouts'
import classRoomRoutes from "./classRoomRoutes"




const router: Router = Router()

router.use("/auth", userRoutes)
router.use("/courses", courseRoutes)
router.use("/assignments", assignmentRoutes)
router.use("/classrooms", classRoomRoutes)


// old ones below this line 


router.use("/posts", postRoutes)
router.use("/comments", commentRoutes)



export default router
