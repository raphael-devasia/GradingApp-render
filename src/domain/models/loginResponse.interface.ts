export interface ILoginResponse {
    token: string // The JWT token
    message: string // A success or informational message
    expiresIn: number // Token expiration time in seconds
    userId?: string // Optional: User ID for additional context
    email?: string // Optional: User email for convenience
    firstName?: string // Optional: User's first name
    lastName?: string // Optional: User's last name
}
