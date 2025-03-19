import { IPost } from "../../domain/models/post.interface"
import { IIPostRepository } from "../../domain/repositories/postRepository.interface"

export class PostUseCase {
    constructor(private postRepository: IIPostRepository) {}

    async createPost(postData: IPost): Promise<IPost> {
        return this.postRepository.create(postData)
    }

    async getPostById(postId: string): Promise<IPost | null> {
        return this.postRepository.findById(postId)
    }
    async getUrl(
        fileName: string
    ): Promise<{ presignedUrl: string; fileUrl: string } | null> {
        return this.postRepository.getUrl(fileName)
    }

    async getPostsByCategory(categoryId: string): Promise<IPost[]> {
        return this.postRepository.getPostsByCategory(categoryId)
    }

    async updatePost(
        postId: string,
        postData: Partial<IPost>
    ): Promise<IPost | null> {
        return this.postRepository.update(postId, postData)
    }
    async patchPost(
        postId: string,
        postData: Partial<IPost>
    ): Promise<IPost | null> {
        return this.postRepository.patch(postId, postData)
    }

    async deletePost(postId: string): Promise<boolean> {
        return this.postRepository.delete(postId)
    }

    async getAllPosts(): Promise<IPost[]> {
        return this.postRepository.getAllPosts()
    }
    async getAllUserPosts(userId: string): Promise<IPost[]> {
        return this.postRepository.getAllUserPosts(userId)
    }

    // Include the image upload method
    async uploadImage(
        fileBuffer: Buffer,
        fileName: string,
        mimeType: string
    ): Promise<string> {
        if (!fileBuffer || !fileName || !mimeType) {
            throw new Error("Invalid file input")
        }

        // Delegate to the repository via the interface
        return await this.postRepository.upload(fileBuffer, fileName, mimeType)
    }
}
