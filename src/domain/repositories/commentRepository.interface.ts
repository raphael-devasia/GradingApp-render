import { IComment } from "../models/comment.interface"

// export interface ICommentRepository {
//     create(comment: IComment): Promise<IComment>
//     findById(id: string): Promise<IComment | null>
//     findByUserId(userId: string): Promise<IComment[]>
//     getAllByPost(postId: string): Promise<IComment[]>
//     update(id: string, comment: Partial<IComment>): Promise<IComment | null>
//     delete(id: string): Promise<boolean>
// }
export interface ICommentRepository {
    createComment(comment: IComment): Promise<IComment>
    findCommentById(commentId: string): Promise<IComment | null>
    findCommentByUserId(userId: string): Promise<IComment[]>
    getAllCommentByPost(postId: string): Promise<IComment[]>
    updateComment(commentId: string, comment: Partial<IComment>): Promise<IComment | null>
    deleteComment(commentId: string): Promise<boolean>
}