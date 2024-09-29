import express, { Router } from "express";
import schemaValidation from "../../../utils/schemaValidation.js";
import protectAuth from "../../middlewares/protectAuth.js";
import { createCheckoutSession, createOnlineOrder, createOrder, getAllOrders, getAllUserOrders } from "./order.controller.js";
import { createCheckoutSessionSchema, createOrderSchema } from "./order.validation.js";
import roleAccess from "../../middlewares/RoleAccess.js";

const orderRouter = Router();

orderRouter.get(
    "/myOrders",
    protectAuth,
    getAllUserOrders
)

orderRouter.post(
    "/checkout",
    protectAuth,
    schemaValidation(createCheckoutSessionSchema),
    createCheckoutSession
)

orderRouter.post(
    "/api/webhook",
    express.raw({ type: 'application/json' }),
    createOnlineOrder
)

// app.post('/api/webhook/', express.raw({ type: 'application/json' }), );

orderRouter
    .route("/")
    .post(
        protectAuth,
        schemaValidation(createOrderSchema),
        createOrder
    )
    .get(
        protectAuth,
        roleAccess("admin"),
        getAllOrders
    )

export default orderRouter;
