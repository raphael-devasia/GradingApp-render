import { IComment } from "../models/comment.interface"

export interface ICommentRepository {
    create(comment: IComment): Promise<IComment>
    findById(id: string): Promise<IComment | null>
    findByUserId(userId: string): Promise<IComment[]>
    getAllByPost(postId: string): Promise<IComment[]>
    update(id: string, comment: Partial<IComment>): Promise<IComment | null>
    delete(id: string): Promise<boolean>
}
