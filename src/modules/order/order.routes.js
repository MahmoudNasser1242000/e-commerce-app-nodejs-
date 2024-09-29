import { Router } from "express";
import schemaValidation from "../../../utils/schemaValidation.js";
import protectAuth from "../../middlewares/protectAuth.js";
import { createOrder, getAllOrders, getAllUserOrders } from "./order.controller.js";
import { createOrderSchema } from "./order.validation.js";
import roleAccess from "../../middlewares/RoleAccess.js";

const orderRouter = Router();

orderRouter.get(
    "/myOrders",
    protectAuth,
    getAllUserOrders
)

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
