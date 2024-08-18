import slugify from "slugify";
import categoryModel from "../../../database/models/category.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";

const addCategorey = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const category = await categoryModel.insertMany(req.body);
    res.status(201).json({msg: "Category added successfully", category});
})

const getAllCategories = errorAsyncHandler(async (req, res, next) => {
    const categories = await categoryModel.find({});
    res.status(201).json({categories});
})

const getSpecificCategory = errorAsyncHandler(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.categoryId);
    if (!category) 
        return next(new AppError("Cant not find category with this id", 400))
    res.status(201).json({category});
})

export {
    addCategorey,
    getAllCategories,
    getSpecificCategory,
}