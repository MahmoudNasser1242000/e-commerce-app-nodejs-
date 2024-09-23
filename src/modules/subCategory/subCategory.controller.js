import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import subCategoryModel from "../../../database/models/subCategory.model.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";

const addSubCategorey = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    const subCategory = await subCategoryModel.insertMany({ ...req.body });
    res.status(201).json({ msg: "SubCategory added successfully", subCategory });
});

const getAllSubCategories = errorAsyncHandler(async (req, res, next) => {
    const subCategories = await subCategoryModel.find({}).populate("categoryId");
    res.status(200).json({ subCategories });
});

const getSpecificSubCategory = findById(
    subCategoryModel,
    "subCategoryId",
    "subCategory"
);

const updateSubCategory = errorAsyncHandler(async (req, res, next) => {
    const { subCategoryId } = req.params;
    const { name } = req.body;
    if (name) req.body.slug = slugify(name);

    const subCategory = await subCategoryModel.findByIdAndUpdate(
        { _id: subCategoryId },
        { ...req.body },
        { new: true }
    );
    if (!subCategory)
        return next(new AppError("Cant not find subCategory with this id", 400));
    res
        .status(202)
        .json({ msg: "SubCategory updated successfully", subCategory });
});

const deleteSubCategory = findByIdAndDelete(
    subCategoryModel,
    "subCategoryId",
    "subCategory"
);

export {
    addSubCategorey,
    getAllSubCategories,
    getSpecificSubCategory,
    updateSubCategory,
    deleteSubCategory,
};
