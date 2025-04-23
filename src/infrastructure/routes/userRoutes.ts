import { Router } from "express"
import { createUserController } from "../factories/userFactory"
import authorize from "../../interfaces/controllers/authMiddleware"

const userRoutes = Router()
const userController = createUserController()


userRoutes.post("/update-plan",authorize, (req, res) =>
    userController.updatePlan(req, res)
)


export default userRoutes
