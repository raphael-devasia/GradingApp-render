import express, { Request, Response } from "express"
import Stripe from "stripe"
import { IUser } from "../../domain/models/user.interface"
import { UserRepositoryMongo } from "../repositories/userRepositoryMongo"

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-03-31.basil",
})
const userRepository = new UserRepositoryMongo()

// Webhook route with raw body
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response): Promise<void> => {
        const sig = req.headers["stripe-signature"] as string
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

        // Verify webhook secret
        if (!webhookSecret) {
            console.error("STRIPE_WEBHOOK_SECRET is not set")
            res.status(500).json({ error: "Webhook secret not configured" })
            return
        }

        // Verify signature
        if (!sig) {
            console.error("Missing stripe-signature header")
            res.status(400).json({ error: "Missing stripe-signature header" })
            return
        }

        let event: Stripe.Event
        try {
            console.log("Received webhook with signature:", sig)
            console.log("Raw body length:", req.body.length)
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
            console.log("Webhook event verified:", event.type)
        } catch (err: any) {
            console.error("Webhook verification failed:", err.message)
            res.status(400).json({ error: `Webhook Error: ${err.message}` })
            return
        }

        try {
            switch (event.type) {
                case "customer.subscription.created":
                case "customer.subscription.updated":
                case "customer.subscription.deleted":
                    const subscription = event.data
                        .object as Stripe.Subscription
                    console.log("Processing subscription event:", {
                        eventType: event.type,
                        subscriptionId: subscription.id,
                        customerId: subscription.customer,
                        status: subscription.status,
                        planId: subscription.items.data[0]?.plan.id,
                        billingCycle: subscription.items.data[0]?.plan.interval,
                    })

                    const customer = (await stripe.customers.retrieve(
                        subscription.customer as string
                    )) as Stripe.Customer

                    if (!customer.email) {
                        console.error("Customer has no email:", {
                            customerId: subscription.customer,
                        })
                        res.status(400).json({ error: "Customer has no email" })
                        return
                    }

                    const user: IUser | null = await userRepository.findByEmail(
                        customer.email
                    )
                    if (!user) {
                        console.error(
                            "User not found for email:",
                            customer.email
                        )
                        res.status(404).json({ error: "User not found" })
                        return
                    }

                    // Check if subscription data is already up-to-date (idempotency)
                    if (
                        user.subscription?.stripeSubscriptionId ===
                            subscription.id &&
                        user.subscription?.status === subscription.status &&
                        user.subscription?.plan ===
                            subscription.items.data[0]?.plan.id &&
                        user.subscription?.billingCycle ===
                            subscription.items.data[0]?.plan.interval &&
                        user.subscription?.stripeCustomerId ===
                            subscription.customer
                    ) {
                        console.log(
                            "Subscription data unchanged, skipping update:",
                            user._id
                        )
                        res.json({ received: true })
                        return
                    }

                    // Update user subscription based on schema
                    user.subscription = {
                        stripeCustomerId: subscription.customer as string,
                        stripeSubscriptionId: subscription.id,
                        status: subscription.status,
                        plan:
                            subscription.items.data[0]?.plan.id ||
                            user.subscription?.plan ||
                            "default",
                        billingCycle:
                            subscription.items.data[0]?.plan.interval ||
                            user.subscription?.billingCycle ||
                            "monthly",
                    }
                    console.log("Updating user subscription:", {
                        userId: user._id,
                        email: user.email,
                        subscription: user.subscription,
                    })

                    // Persist full subscription object
                    await userRepository.update(user._id as string, {
                        subscription: user.subscription,
                    })

                    // Call updatePlan with safe fallbacks
                    await userRepository.updatePlan(
                        user.subscription.plan || "default",
                        user.subscription.billingCycle || "monthly",
                        user._id as string
                    )
                    console.log("User plan updated successfully:", user._id)
                    break

                default:
                    console.log("Unhandled event type:", event.type)
            }
        } catch (err: any) {
            console.error("Error processing webhook event:", err.message)
            res.status(500).json({ error: "Failed to process webhook" })
            return
        }

        res.json({ received: true })
    }
)

export default router
