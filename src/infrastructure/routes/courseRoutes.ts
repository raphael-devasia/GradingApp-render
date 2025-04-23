import { Router } from "express"


import authorize from "../../interfaces/controllers/authMiddleware"
import { CourseController } from "../../interfaces/controllers/courseController"
import { createCourseController } from "../factories/courseFactory"

const router: Router = Router()

const courseController: CourseController = createCourseController()


// Get All Courses for an Instructor
router.get("/all",authorize, (req, res) =>
    courseController.getAllUserCourses(req, res)
) 
// Create a new Course
router.post("/", authorize, (req, res) =>
    courseController.createCourse(req, res)
) 

// Get Course Details

router.get("/:courseId", (req, res) => courseController.getCourse(req, res)) 

router.get("/all", (req, res) => courseController.getAllCourses(req, res)) 



router.put("/:id", authorize, (req, res) => courseController.updateCourse(req, res)) 
router.patch("/:id", authorize, (req, res) =>
    courseController.patchCourse(req, res)
) 
router.delete("/:id", authorize, (req, res) =>
    courseController.deleteCourse(req, res)
) 

export default router
