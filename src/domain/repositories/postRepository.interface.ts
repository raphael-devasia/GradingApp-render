import { IPost } from "../models/post.interface"

export interface IIPostRepository {
    create(post: IPost): Promise<IPost>
    findById(postId: string): Promise<IPost | null>
    getUrl(
        fileName: string
    ): Promise<{ presignedUrl: string; fileUrl: string } | null>
    getAllPosts(): Promise<IPost[]>
    getAllUserPosts(userId: string): Promise<IPost[]>
    update(postId: string, iPosIPost: Partial<IPost>): Promise<IPost | null>
    patch(postId: string, iPosIPost: Partial<IPost>): Promise<IPost | null>
    delete(postId: string): Promise<boolean>
    getPostsByCategory(categoryId: string): Promise<IPost[]>
    upload(
        fileBuffer: Buffer,
        fileName: string,
        mimeType: string
    ): Promise<string>
}
