import { Router } from "express"
import { createUserController } from "../factories/userFactory"


const userRoutes = Router()
const userController = createUserController()

userRoutes.post("/register", (req, res) => userController.createUser(req, res))
userRoutes.post("/login", (req, res) => userController.loginUser(req, res))


export default userRoutes

