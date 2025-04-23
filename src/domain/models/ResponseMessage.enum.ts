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

export enum CourseMessages {
    COURSE_CREATED = "Course created successfully",
    COURSE_DELETED = "Course deleted",
    NOT_FOUND = "Course not found",
    NO_FILE = "No file provided",
    SERVER_ERROR = "Internal server error",
}

export enum AssignmentMessages {
    ASSIGNMENT_CREATED = "Assignment created successfully",
    ASSIGNMENT_DELETED = "Assignment deleted",
    NOT_FOUND = "Assignment not found",
    NO_FILE = "No file provided",
    SERVER_ERROR = "Internal server error",
}