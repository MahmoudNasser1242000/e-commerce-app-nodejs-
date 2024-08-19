import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import subCategoryModel from "../../../database/models/subCategory.model.js";
import AppError from "../../../utils/errorClass.js";

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

const getSpecificSubCategory = errorAsyncHandler(async (req, res, next) => {
    const subCategory = await subCategoryModel.findById(req.params.subCategoryId);
    if (!subCategory) 
        return next(new AppError("Cant not find subCategory with this id", 400))
    res.status(200).json({subCategory});
})

export {
    addSubCategorey,
    getAllSubCategories,
    getSpecificSubCategory,
}