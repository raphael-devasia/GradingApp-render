import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import dotenv from "dotenv"

import cors from "cors"
import { connectMongoDB } from "./infrastructure/db/models/mongoConfig"
import routes from "./infrastructure/routes"
import { cleanupInactiveUsers } from "./infrastructure/jobs/cleanupInactiveUsers"
import stripeRoutes from "./infrastructure/routes/stripe"



dotenv.config()

const app = express()
app.use(morgan("dev"))
app.use(cors())

// Test route
app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Test route is working!",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/stripe", stripeRoutes)

app.use(bodyParser.json())
connectMongoDB()

// Use the routes
app.use("/api", routes)

cleanupInactiveUsers()

// Export the app for Vercel
export default app;

// Optional: Keep app.listen for local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}