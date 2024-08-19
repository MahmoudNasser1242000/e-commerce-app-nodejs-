import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import subCategoryModel from "../../../database/models/subCategory.model.js";

const addSubCategorey = errorAsyncHandler(async (req, res, next) => {
    const {categoryId} = req.params
    req.body.slug = slugify(req.body.name)
    const subCategory = await subCategoryModel.insertMany({...req.body, categoryId});
    res.status(201).json({msg: "SubCategory added successfully", subCategory});
})

const getAllSubCategories = errorAsyncHandler(async (req, res, next) => {
    const subCategories = await subCategoryModel.find({}).populate("categoryId");
    res.status(200).json({subCategories});
})

export {
    addSubCategorey,
    getAllSubCategories
}