import { Router } from "express"


import authorize from "../../interfaces/controllers/authMiddleware"
import { AssignmentController } from "../../interfaces/controllers/assignmentController"
import { createAssignmentController } from "../factories/assignmentFactory"


const router: Router = Router()

const assignmentController: AssignmentController = createAssignmentController()

// Create a new Assignment
router.post("/", authorize, (req, res) =>
    assignmentController.createAssignment(req, res)
) 

// Create a new Assignment AI-Content
router.post("/generate", authorize, (req, res) =>
    assignmentController.generateAssignmentContent(req, res)
) 






// Get All Assignments for an Instructor
router.get("/all",authorize, (req, res) =>
    assignmentController.getAllUserAssignments(req, res)
) 



// // Get Assignment Details

// router.get("/:assignmentId", (req, res) => assignmentController.getAssignment(req, res)) 

// router.get("/all", (req, res) => assignmentController.getAllAssignments(req, res)) 



// router.put("/:id", authorize, (req, res) => assignmentController.updateAssignment(req, res)) 
// router.patch("/:id", authorize, (req, res) =>
//     assignmentController.patchAssignment(req, res)
// ) 
// router.delete("/:id", authorize, (req, res) =>
//     assignmentController.deleteAssignment(req, res)
// ) 

export default router
