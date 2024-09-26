import reviewModel from "../../database/models/review.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkReviewOwner = errorAsyncHandler(async (req, res, next) => {
    const {product} = req.body
    const review = await reviewModel.findOne({createdBy: req.user._id, product});

    if (review) 
        return next(new AppError("You allready have review for this product", 400));
    next()
})

export default checkReviewOwner