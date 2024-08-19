import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import subCategoryModel from "../../../database/models/subCategory.model.js";

const addSubCategorey = errorAsyncHandler(async (req, res, next) => {
    const {categoryId} = req.params
    req.body.slug = slugify(req.body.name)
    const subCategory = await subCategoryModel.insertMany({...req.body, categoryId});
    res.status(201).json({msg: "SubCategory added successfully", subCategory});
})

export {
    addSubCategorey,
}