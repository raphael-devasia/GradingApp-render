import { s3 } from "../s3Config"
import * as dotenv from "dotenv"
dotenv.config()
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import Post from "../db/models/post.model"
import { IIPostRepository } from "../../domain/repositories/postRepository.interface"
import { IPost } from "../../domain/models/post.interface"

const s3client = new S3Client({
    region: process.env.AWS_REGION,

    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export class PostRepositoryMongo implements IIPostRepository {
    async create(post: IPost): Promise<IPost> {
        try {
            const result = await Post.create(post)
            console.log(result)
            return result
        } catch (error) {
            throw new Error("Failed to save the post")
        }
    }
    async findById(id: string): Promise<IPost | null> {
        try {
            // Assuming you are using a database query or service call to fetch the post by ID
            const post = await Post.findById(id)
            if (!post) {
                console.log("Post not found")
                return null // If the post is not found, return null
            }
            post.views += 1

            // Save the updated post back to the database
            await post.save()
            return post
        } catch (error) {
            console.error("Error fetching post by ID:", error)
            throw new Error("Error fetching post.") // Re-throw or handle the error as needed
        }
    }
    // async getAll(userId: string): Promise<IPost[]> {
    //     try {
    //         console.log("Getting all posts for user:", userId)
    //         // Fetch posts filtered by userId
    //         const posts = await Post.find({ userId: userId })
    //         return posts
    //     } catch (error: any) {
    //         console.error("Error fetching posts:", error.message) // Log the error for debugging
    //         throw new Error("Failed to fetch posts. Please try again later.") // Throw a user-friendly error message
    //     }
    // }
    async getAllUserPosts(userId: string): Promise<IPost[]> {
        try {
            // Fetch posts filtered by userId
            const posts = await Post.find({ userId: userId })
                .populate({
                    path: "userId", // Field in Post schema referencing User
                    select: "firstName lastName", // Only fetch these fields
                })
                .exec()
            // Map posts to include firstName and lastName directly in the object
            const enrichedPosts = posts.map((post) => {
                const populatedUser = post.userId as {
                    firstName: string
                    lastName: string
                } // Type assertion
                return {
                    ...post.toObject(),
                    firstName: populatedUser.firstName || "Unknown",
                    lastName: populatedUser.lastName || "User",
                }
            })

            console.log("Fetched Posts:", enrichedPosts)
            return enrichedPosts
        } catch (error: any) {
            console.error("Error fetching posts:", error.message) // Log the error for debugging
            throw new Error("Failed to fetch posts. Please try again later.") // Throw a user-friendly error message
        }
    }
    async getAllPosts(): Promise<IPost[]> {
         try {
             // Fetch posts filtered by userId
             const posts = await Post.find()
                 .populate({
                     path: "userId", // Field in Post schema referencing User
                     select: "firstName lastName", // Only fetch these fields
                 })
                 .exec()
             // Map posts to include firstName and lastName directly in the object
             const enrichedPosts = posts.map((post) => {
                 const populatedUser = post.userId as {
                     firstName: string
                     lastName: string
                 } // Type assertion
                 return {
                     ...post.toObject(),
                     firstName: populatedUser.firstName || "Unknown",
                     lastName: populatedUser.lastName || "User",
                 }
             })

             console.log("Fetched Posts:", enrichedPosts)
             return enrichedPosts
         } catch (error: any) {
             console.error("Error fetching posts:", error.message) // Log the error for debugging
             throw new Error("Failed to fetch posts. Please try again later.") // Throw a user-friendly error message
         }
    }
    async update(id: string, iPosIPost: Partial<IPost>): Promise<IPost | null> {
        try {
            // Find the post by its ID
            const post = await Post.findById(id) // Assuming `postModel` is your model for accessing the database

            // If the post does not exist, return null
            if (!post) {
                console.error("Post not found")
                return null
            }

            // Update the post with the provided data (iPosIPost)
            const updatedPost = await Post.findByIdAndUpdate(id, iPosIPost, {
                new: true,
            })

            // Return the updated post
            return updatedPost
        } catch (error) {
            // Catch any errors and log them
            console.error("Error updating post:", error)
            throw new Error("Failed to update the post")
        }
    }
    async patch(id: string, iPosIPost: Partial<IPost>): Promise<IPost | null> {
        console.log(iPosIPost)

        try {
            // Find the post by its ID
            const post = await Post.findById(id) // Assuming `postModel` is your model for accessing the database

            // If the post does not exist, return null
            if (!post) {
                console.error("Post not found")
                return null
            }

            // Update the post with the provided data (iPosIPost)
            const updatedPost = await Post.findByIdAndUpdate(id, iPosIPost, {
                new: true,
            })
            console.log(updatedPost)
            // Return the updated post
            return updatedPost
        } catch (error) {
            // Catch any errors and log them
            console.error("Error updating post:", error)
            throw new Error("Failed to update the post")
        }
    }
    async delete(id: string): Promise<boolean> {
        try {
            const result = await Post.findByIdAndDelete(id)

            if (result) {
                console.log(`Successfully deleted item with ID: ${id}`)
                return true
            } else {
                throw new Error(`No item found with ID: ${id}`)
            }
        } catch (error) {
            throw error // Re-throwing the error for further handling
        }
    }
    getPostsByCategory(categoryId: string): Promise<IPost[]> {
        throw new Error("Method not there.")
    }
    async upload(
        fileBuffer: Buffer,
        fileName: string,
        mimeType: string
    ): Promise<string> {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME as string, // Your bucket name
            Key: `uploads/${Date.now()}_${fileName}`, // Unique file name
            Body: fileBuffer,
            ContentType: mimeType,
            ACL: "public-read", // Make the file publicly accessible
        }
        console.log(params)

        const data = await s3.upload(params).promise()
        console.log(data.Location)

        return data.Location // Return the S3 file URL
    }
    async getUrl(
        fileName: string
    ): Promise<{ presignedUrl: string; fileUrl: string } | null> {
        const timestamp = Date.now()
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `uploads/${timestamp}_${fileName}`, // Unique file name
            ContentType: "image/jpeg", // Specify the content type, adjust as necessary
        }
        console.log(params)

        try {
            const command = new PutObjectCommand(params)
            const url = await getSignedUrl(s3client, command, {
                expiresIn: 300,
            })
            console.log(url)

            // Construct the final file URL
            const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/uploads/${timestamp}_${fileName}`

            return { presignedUrl: url, fileUrl }
        } catch (error) {
            console.error("Error generating presigned URL:", error)
            return null
        }
    }
}
