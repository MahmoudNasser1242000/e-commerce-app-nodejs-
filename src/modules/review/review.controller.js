import reviewModel from "../../../database/models/review.model.js";
import { findById, findByIdAndDelete, findOne } from "../../../services/apiHandler.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";
import AppError from "../../../utils/errorClass.js";

const addReview = errorAsyncHandler(async (req, res, next) => {
    req.body.createdBy = req.user._id;
    const addReview = new reviewModel({...req.body})
    const review = await addReview.save();
    res.status(201).json({msg: "Review added successfully", review});
})

const getAllReviews = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {};
    if (req.params.createdBy) {
        filterObj.createdBy = req.params.createdBy
    }
    const apiFeatures = new ApiFeatures(reviewModel.find(filterObj), req.query)
        .pagination()
        .filter()
        .sort()
        .search()
        .fields();
    const reviews = await apiFeatures.mongooseQuery;
    res
        .status(200)
        .json({ length: reviews.length, page: apiFeatures.page, reviews });
})

const getSpecificReview = findOne(reviewModel, "reviewId", "review")

const updateReview = errorAsyncHandler(async (req, res, next) => {
    const {reviewId} = req.params;
    const review = await reviewModel.findOneAndUpdate({_id: reviewId, createdBy: req.user._id}, {...req.body}, {new: true});
    if (!review) 
        return next(new AppError("Review not found", 400))
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