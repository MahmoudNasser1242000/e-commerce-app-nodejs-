import subCategoryModel from "../../database/models/subCategory.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkSubCategory = errorAsyncHandler(async (req, res, next) => {
    const subCategory = await subCategoryModel.findById(req.body.subCategory || req.params.subCategory);

    if (!subCategory) 
        return next(new AppError("Can not find subCategory with this id", 400));
    next()
})

export default checkSubCategory