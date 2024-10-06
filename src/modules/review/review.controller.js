import reviewModel from "../../../database/models/review.model.js";
import { findByIdAndDelete, findOne } from "../../../services/apiHandler.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";
import AppError from "../../../utils/errorClass.js";

// @desc      add review
// @method    POST
// @route     /api/v1/reviews/:product
// @access    public
const addReview = errorAsyncHandler(async (req, res, next) => {
    req.body.createdBy = req.user._id;
    const addReview = new reviewModel({...req.body})
    const review = await addReview.save();
    res.status(201).json({msg: "Review added successfully", review});
})

// @desc      get all reviews
// @method    GET
// @route     /api/v1/reviews/
// @access    admin
const getAllReviews = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {};
    if (req.params.createdBy) {
        filterObj.createdBy = req.params.createdBy
    }

    const collectionLength = (await reviewModel.find(filterObj)).length
    const apiFeatures = new ApiFeatures(reviewModel.find(filterObj), req.query)
        .pagination(collectionLength)
        .filter()
        .sort()
        .search()
        .fields();
    const reviews = await apiFeatures.mongooseQuery;
    res
        .status(200)
        .json({ length: reviews.length, metadata: apiFeatures.metadata, page: apiFeatures.page, reviews });
})

// @desc      get specific review
// @method    GET
// @route     /api/v1/reviews/:review
// @access    public
const getSpecificReview = findOne(reviewModel, "review", "review")

// @desc      update specific review
// @method    PATCH
// @route     /api/v1/reviews/:review
// @access    public
const updateReview = errorAsyncHandler(async (req, res, next) => {
    const review = await reviewModel.findOneAndUpdate({_id: req.params.review, createdBy: req.user._id}, {...req.body}, {new: true});
    if (!review) 
        return next(new AppError("Review not found", 400))
    res.status(202).json({msg: "Review updated successfully", review});
})

// @desc      delete specific review
// @method    DELETE
// @route     /api/v1/reviews/:review
// @access    public
const deleteReview = findByIdAndDelete(reviewModel, "review", "review")

export {
    addReview,
    getAllReviews,
    getSpecificReview,
    updateReview,
    deleteReview
}