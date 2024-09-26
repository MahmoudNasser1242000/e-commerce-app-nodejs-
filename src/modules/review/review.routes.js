import {Router} from "express";
import { addReview, deleteReview, getAllReviews, getSpecificReview, updateReview } from "./review.controller.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addReviewSchema, reviewIdSchema, updateReviewSchema } from "./review.validation.js";
import protectAuth from "../../middlewares/protectAuth.js";
import checkReviewOwner from "../../middlewares/checkReviewOwner.js";
import checkProductId from "../../middlewares/checkProductId.js";

const reviewRoter = Router({mergeParams: true});

reviewRoter.route("/")
    .post(
        protectAuth,
        checkProductId,
        checkReviewOwner,
        schemaValidation(addReviewSchema),
        addReview
    )
    .get(
        protectAuth,
        getAllReviews
    )

reviewRoter.route("/:reviewId")
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