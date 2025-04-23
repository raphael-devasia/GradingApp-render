import { Router } from "express"

import commentRoutes from "./commentRoutes"
import userRoutes from "./userRoutes"
import postRoutes from "./postRoutes"
import courseRoutes from './courseRoutes'
import assignmentRoutes from './assignmentRouts'
import classRoomRoutes from "./classRoomRoutes"
import stripeRoutes from "./classRoomRoutes"
import authRoutes from "./authRoutes"






const router: Router = Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/courses", courseRoutes)
router.use("/assignments", assignmentRoutes)
router.use("/classrooms", classRoomRoutes)
router.use("/stripe", stripeRoutes)


// old ones below this line 


router.use("/posts", postRoutes)
router.use("/comments", commentRoutes)



export default router
