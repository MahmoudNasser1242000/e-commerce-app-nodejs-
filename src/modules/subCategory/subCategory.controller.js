import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import subCategoryModel from "../../../database/models/subCategory.model.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";

const addSubCategorey = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    const subCategory = await subCategoryModel.insertMany({ ...req.body });
    res.status(201).json({ msg: "SubCategory added successfully", subCategory });
});

const getAllSubCategories = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {}
    if (req.params.category) 
        filterObj.category = req.params.category

    const apiFeatures = new ApiFeatures(subCategoryModel.find(filterObj), req.query)
        .pagination()
        .filter()
        .sort()
        .search()
        .fields();
    const subCategorys = await apiFeatures.mongooseQuery;
    res
        .status(200)
        .json({ length: subCategorys.length, page: apiFeatures.page, subCategorys });
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

    const subCategory = await subCategoryModel.findOneAndUpdate(
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
