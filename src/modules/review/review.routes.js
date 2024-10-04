import {Router} from "express";
import { addReview, deleteReview, getAllReviews, getSpecificReview, updateReview } from "./review.controller.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addReviewSchema, reviewIdSchema, updateReviewSchema } from "./review.validation.js";
import protectAuth from "../../middlewares/protectAuth.js";
import checkReviewOwner from "../../middlewares/checkReviewOwner.js";
import checkProductId from "../../middlewares/checkProductId.js";
import roleAccess from "../../middlewares/RoleAccess.js";

const reviewRoter = Router({mergeParams: true});

reviewRoter.route("/")
    .post(
        protectAuth,
        schemaValidation(addReviewSchema),
        checkProductId,
        checkReviewOwner,
        addReview
    )
    .get(
        protectAuth,
        roleAccess("admin"),
        getAllReviews
    )

reviewRoter.route("/:review")
    .get(
        protectAuth,
        schemaValidation(reviewIdSchema),
        getSpecificReview
    )
    .patch(
        protectAuth,
        schemaValidation(updateReviewSchema),
        updateReview
    )
    .delete(
        protectAuth,
        schemaValidation(reviewIdSchema),
        deleteReview
    )
export default reviewRoter;