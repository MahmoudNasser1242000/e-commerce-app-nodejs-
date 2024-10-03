import subCategoryModel from "../../database/models/subCategory.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkSubCategory = errorAsyncHandler(async (req, res, next) => {
    if (req.body.subCategory || req.params.subCategory) {
        const subCategory = await subCategoryModel.findOne({ _id: req.body.subCategory || req.params.subCategory });

        if (!subCategory)
            return next(new AppError("Can not find subCategory with this id", 400));
        next()
    } else {
        next()
    }
})

export default checkSubCategory