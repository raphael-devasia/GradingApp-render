export enum ResponseMessage {
    COMMENT_CREATED = "Comment created successfully",
    COMMENT_DELETED = "Comment deleted",
    COMMENT_NOT_FOUND = "Comment not found",
    BAD_REQUEST = "Bad request",
    SERVER_ERROR = "Internal server error",
}
export enum AuthMessages {
    NO_TOKEN = "Access Denied: No Token Provided",
    INVALID_TOKEN = "Invalid Token",
}

export enum PostMessages {
    POST_CREATED = "Post created successfully",
    POST_DELETED = "Post deleted",
    NOT_FOUND = "Post not found",
    NO_FILE = "No file provided",
    SERVER_ERROR = "Internal server error",
}