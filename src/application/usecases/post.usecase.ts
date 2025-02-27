import { IPost } from "../../domain/models/post.interface"
import { IIPostRepository } from "../../domain/repositories/postRepository.interface"

export class PostUseCase {
    constructor(private postRepository: IIPostRepository) {}

    async createPost(postData: IPost): Promise<IPost> {
        return this.postRepository.create(postData)
    }

    async getPostById(id: string): Promise<IPost | null> {
        return this.postRepository.findById(id)
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
        id: string,
        postData: Partial<IPost>
    ): Promise<IPost | null> {
        return this.postRepository.update(id, postData)
    }
    async patchPost(
        id: string,
        postData: Partial<IPost>
    ): Promise<IPost | null> {
        return this.postRepository.patch(id, postData)
    }

    async deletePost(id: string): Promise<boolean> {
        return this.postRepository.delete(id)
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
