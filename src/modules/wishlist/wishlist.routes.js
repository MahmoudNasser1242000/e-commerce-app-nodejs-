import { Router } from "express";
import schemaValidation from "../../../utils/schemaValidation.js";
import { productIdSchema } from "./wishlist.validation.js";
import { addToWishlist, getAllFromWishlist, removeFromWishlist } from "./wishlist.controller.js";
import checkProductId from "../../middlewares/checkProductId.js";
import protectAuth from "../../middlewares/protectAuth.js";

const wishlistRouter = Router();

wishlistRouter
    .route("/:product")
    .post(
        protectAuth,
        schemaValidation(productIdSchema),
        checkProductId,
        addToWishlist
    )
    .delete(
        protectAuth,
        schemaValidation(productIdSchema),
        checkProductId,
        removeFromWishlist
    );

wishlistRouter.get("/", protectAuth, getAllFromWishlist);
export default wishlistRouter;
