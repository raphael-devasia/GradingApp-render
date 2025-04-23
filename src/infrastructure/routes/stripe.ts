import { Router, Request, Response } from "express"
const express = require('express')
import Stripe from "stripe"
import { IUser } from "../../domain/models/user.interface"
import { UserRepositoryMongo } from "../repositories/userRepositoryMongo"

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-03-31.basil",
})
const userRepository = new UserRepositoryMongo()

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response): Promise<void> => {
        const sig = req.headers["stripe-signature"] as string
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

        let event: Stripe.Event
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
        } catch (err: any) {
            console.error("Webhook error:", err.message)
            res.status(400).send(`Webhook Error: ${err.message}`)
            return
        }

        switch (event.type) {
            case "customer.subscription.created":
            case "customer.subscription.updated":
            case "customer.subscription.deleted":
                const subscription = event.data.object as Stripe.Subscription
                const customer = (await stripe.customers.retrieve(
                    subscription.customer as string
                )) as Stripe.Customer

                if (!customer.email) {
                    console.error("Customer has no email")
                    break
                }

                const user: IUser | null = await userRepository.findByEmail(
                    customer.email
                )
                if (user) {
                    user.subscription = {
                        ...user.subscription,
                        stripeCustomerId: subscription.customer as string,
                        stripeSubscriptionId: subscription.id,
                        status: subscription.status,
                    }
                    await userRepository.updatePlan(
                        user.subscription.plan || "",
                        user.subscription.billingCycle || "",
                        user._id as string
                    )
                }
                break
        }

        res.json({ received: true })
    }
)

export default router
