import { Router } from "express"


import authorize from "../../interfaces/controllers/authMiddleware"
import { ClassRoomController } from "../../interfaces/controllers/classRoomController"
import { createClassRoomController } from "../factories/classRoomFactory"



const router: Router = Router()

const classRoomController: ClassRoomController = createClassRoomController()





router.get("/all",authorize, (req, res) => classRoomController.findClassrooms(req, res))
router.post("/students", (req, res) =>
    classRoomController.addStudent(req, res)
)
router.post("/co-teachers", (req, res) =>
    classRoomController.addCoTeacher(req, res)
)
router.get("/students", (req, res) =>
    classRoomController.getStudents(req, res)
)
router.get("/co-teachers", (req, res) =>
    classRoomController.getCoTeachers(req, res)
)


export default router
