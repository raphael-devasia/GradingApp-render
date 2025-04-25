import { Router } from "express"

import userRoutes from "./userRoutes"

import courseRoutes from './courseRoutes'
import assignmentRoutes from './assignmentRouts'
import classRoomRoutes from "./classRoomRoutes"

import authRoutes from "./authRoutes"






const router: Router = Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/courses", courseRoutes)
router.use("/assignments", assignmentRoutes)
router.use("/classrooms", classRoomRoutes)










export default router
