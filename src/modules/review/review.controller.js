import reviewModel from "../../../database/models/review.model.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";

const addReview = errorAsyncHandler(async (req, res, next) => {
    const addReview = new reviewModel({...req.body})
    const review = await addReview.save();
    res.status(201).json({msg: "Review added successfully", review});
})

const getAllReviews = errorAsyncHandler(async (req, res, next) => {
    const reviews = await reviewModel.find({});
    res.status(200).json({reviews});
})

const getSpecificReview = findById(reviewModel, "reviewId", "review")

const updateReview = errorAsyncHandler(async (req, res, next) => {
    const {reviewId} = req.params;
    const review = await reviewModel.findByIdAndUpdate({_id: reviewId}, {...req.body}, {new: true});
    if (!review) 
        return next(new AppError("Cant not find review with this id", 400))
    res.status(202).json({msg: "Review updated successfully", review});
})

const deleteReview = findByIdAndDelete(reviewModel, "reviewId", "review")

export {
    addReview,
    getAllReviews,
    getSpecificReview,
    updateReview,
    deleteReview
}