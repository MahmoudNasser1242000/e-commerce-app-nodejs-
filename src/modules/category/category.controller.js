import slugify from "slugify";
import categoryModel from "../../../database/models/category.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addCategorey = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const category = await categoryModel.insertMany(req.body);
    res.status(201).json({msg: "Category added successfully", category});
})

const getAllCategories = errorAsyncHandler(async (req, res, next) => {
    const categories = await categoryModel.find({});
    res.status(201).json({categories});
})

export {
    addCategorey,
    getAllCategories
}