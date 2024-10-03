import subCategoryModel from "../../database/models/subCategory.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkSubCategoryName = errorAsyncHandler(async (req, res, next) => {
    const subCategory = await subCategoryModel.findOne({name: req.body.name});

    if (subCategory) 
        return next(new AppError("SubCategory allready exist", 400))
    next()
})

export default checkSubCategoryName