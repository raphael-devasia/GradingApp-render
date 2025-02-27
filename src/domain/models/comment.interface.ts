import { IPost } from "./post.interface"
import { IUser } from "./user.interface"


export interface IComment {
    _id: string
    postId: IPost
    userId: IUser
    comment: string
    name: string
    email: string
}
