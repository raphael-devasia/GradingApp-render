const cron = require('node-cron')

import User from "../db/models/user.model"

export const cleanupInactiveUsers = () => {
    // Run daily at midnight
    cron.schedule("0 0 * * *", async () => {
        try {
            console.log("Running inactive user cleanup job...")
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
            const result = await User.deleteMany({
                "subscription.stripeCustomerId": { $exists: false },
                createdAt: { $lt: oneDayAgo },
            })
            console.log(`Deleted ${result.deletedCount} inactive users.`)
        } catch (error: any) {
            console.error("Error in cleanup job:", error.message || error)
        }
    })
}
