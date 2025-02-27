export interface IPost {
    _id?: string // Optional because it may not be present initially
    title: string
    permalink: string

    content: string
    image: string
    excerpt: string
    isFeatured: boolean
    views: number
    status: string
    createdAt: Date
    // userId: string
    userId: string | { firstName: string; lastName: string } // Updated to allow populated object
    __v?: { $numberInt: string }
    firstName?: string // Added
    lastName?: string // Added
}
