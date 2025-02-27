import { IPost } from "../models/post.interface"

export interface IIPostRepository {
    create(post: IPost): Promise<IPost>
    findById(id: string): Promise<IPost | null>
    getUrl(
        fileName: string
    ): Promise<{ presignedUrl: string; fileUrl: string } | null>
    getAllPosts(): Promise<IPost[]>
    getAllUserPosts(userId: string): Promise<IPost[]>
    update(id: string, iPosIPost: Partial<IPost>): Promise<IPost | null>
    patch(id: string, iPosIPost: Partial<IPost>): Promise<IPost | null>
    delete(id: string): Promise<boolean>
    getPostsByCategory(categoryId: string): Promise<IPost[]>
    upload(
        fileBuffer: Buffer,
        fileName: string,
        mimeType: string
    ): Promise<string>
}
