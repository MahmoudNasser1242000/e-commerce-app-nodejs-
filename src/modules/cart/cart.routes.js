import { Router } from "express";
import schemaValidation from "../../../utils/schemaValidation.js";
import checkProductId from "../../middlewares/checkProductId.js";
import protectAuth from "../../middlewares/protectAuth.js";
import { addToCart, applayCoupon, clearCart, getAllFromCart, removeFromCart, updateInCart } from "./cart.controller.js";
import { addToCartSchema, applayCouponSchema, removeFromCartSchema, updateInCartSchema } from "./cart.validation.js";

const cartRouter = Router();

cartRouter.patch(
    "/:product",
    protectAuth,
    schemaValidation(updateInCartSchema),
    checkProductId,
    updateInCart
);

cartRouter.delete(
    "/clear",
    protectAuth,
    clearCart
);

cartRouter.post(
    "/applayCoupon",
    protectAuth,
    schemaValidation(applayCouponSchema),
    applayCoupon
);

cartRouter
    .route("/")
    .post(
        protectAuth,
        schemaValidation(addToCartSchema),
        checkProductId,
        addToCart
    )
    .delete(
        protectAuth,
        schemaValidation(removeFromCartSchema),
        checkProductId,
        removeFromCart
    )
    .get(protectAuth, getAllFromCart);
    
export default cartRouter;
