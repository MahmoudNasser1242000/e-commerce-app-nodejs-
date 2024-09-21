import {Router} from "express";
import { addReview, deleteReview, getAllReviews, getSpecificReview, updateReview } from "./review.controller.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addReviewSchema, updateReviewSchema } from "./review.validation.js";

const reviewRoter = Router();

reviewRoter.route("/")
    .post(
        schemaValidation(addReviewSchema),
        addReview
    )
    .get(
        getAllReviews
    )

reviewRoter.route("/:reviewId")
    .get(
        getSpecificReview
    )
    .patch(
        schemaValidation(updateReviewSchema),
        updateReview
    )
    .delete(
        deleteReview
    )
export default reviewRoter;