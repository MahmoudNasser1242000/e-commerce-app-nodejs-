import slugify from "slugify";
import categoryModel from "../../../database/models/category.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";

const addCategorey = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    if (req.file)
        req.body.img = req.file.filename
    const category = await categoryModel.insertMany(req.body);
    res.status(201).json({msg: "Category added successfully", category});
})

const getAllCategories = errorAsyncHandler(async (req, res, next) => {
    const categories = await categoryModel.find({});
    res.status(200).json({categories});
})

const getSpecificCategory = findById(categoryModel, "categoryId", "category")

const updateCategory = errorAsyncHandler(async (req, res, next) => {
    const {categoryId} = req.params;
    const {name} = req.body;
    if (name) 
        req.body.slug = slugify(name)

    if (req.file)
        req.body.img = req.file.filename
    const category = await categoryModel.findByIdAndUpdate({_id: categoryId}, {...req.body}, {new: true});
    if (!category) 
        return next(new AppError("Cant not find category with this id", 400))
    res.status(202).json({msg: "Category updated successfully", category});
})

const deleteCategory = findByIdAndDelete(categoryModel, "categoryId", "category")

export {
    addCategorey,
    getAllCategories,
    getSpecificCategory,
    updateCategory,
    deleteCategory
}