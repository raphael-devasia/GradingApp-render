export interface ILoginResponse {
    token: string 
    message: string 
    expiresIn: number 
    userId?: string 
    email?: string 
    firstName?: string 
    lastName?: string 
}
