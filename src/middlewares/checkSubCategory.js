import subCategoryModel from "../../database/models/subCategory.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

const checkSubCategory = errorAsyncHandler(async (req, res, next) => {
    const {subCategoryId} = req.body
    const subCategory = await subCategoryModel.findById(subCategoryId);

    if (subCategoryId && !subCategory) 
        return res.status(400).json({msg: "Can not find subCategory with this id"});
    next()
})

export default checkSubCategory