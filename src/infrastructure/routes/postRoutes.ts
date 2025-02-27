import { Router } from "express"
import { PostController } from "../../interfaces/controllers/PostController"
import { createPostController } from "../factories/postFactory"
import { fileValidationMiddleware } from "../../interfaces/controllers/fileValidationMiddleware"
import { upload } from "../../interfaces/controllers/uploadMiddleware"
import authorize from "../../interfaces/controllers/authMiddleware"

const router: Router = Router()

const postController: PostController = createPostController()
router.get("/get-url", (req, res) => postController.getPresignedUrl(req, res)) // Get all posts

router.post(
    "/upload",
    fileValidationMiddleware,
    upload.single("image"),
    (req, res) => postController.uploadImage(req, res)
)
router.get("/all", (req, res) => postController.getAllPosts(req, res)) // Get all posts
router.get("/all/:id", (req, res) => postController.getAllUserPosts(req, res)) // Get all posts for the user
router.post("/", authorize, (req, res) => postController.createPost(req, res)) // Create a new post
router.get("/:id", (req, res) => postController.getPost(req, res)) // Get post by ID
router.put("/:id", authorize, (req, res) => postController.updatePost(req, res)) // Update post by ID
router.patch("/:id", authorize, (req, res) =>
    postController.patchPost(req, res)
) // Update post by ID
router.delete("/:id", authorize, (req, res) =>
    postController.deletePost(req, res)
) // Delete post by ID

export default router
