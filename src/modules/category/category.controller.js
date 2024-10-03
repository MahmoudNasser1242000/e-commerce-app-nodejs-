import slugify from "slugify";
import categoryModel from "../../../database/models/category.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";

// @desc      add category
// @method     POST
// @route     /api/v1/categories/
// @access    admin
const addCategorey = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    if (req.file) req.body.img = req.file.filename;
    req.body.createdBy = req.user._id;
    const addCategorey = new categoryModel(req.body)
    const category = await addCategorey.save();
    res.status(201).json({ msg: "Category added successfully", category });
});

// @desc      gat all categories
// @method     GET
// @route     /api/v1/categories/
// @access    public
const getAllCategories = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {};
    if (req.params.createdBy) {
        filterObj.createdBy = req.params.createdBy
    }
    const apiFeatures = new ApiFeatures(categoryModel.find(filterObj), req.query)
        .pagination()
        .filter()
        .sort()
        .search()
        .fields();
    const categories = await apiFeatures.mongooseQuery;
    res
        .status(200)
        .json({ length: categories.length, page: apiFeatures.page, categories });
});

// @desc      gat specidic category
// @method     GET
// @route     /api/v1/categories/:category
// @access    public
const getSpecificCategory = findById(categoryModel, "category", "category");


// @desc      update specidic category
// @method     PATCH
// @route     /api/v1/categories/:category
// @access    admin
const updateCategory = errorAsyncHandler(async (req, res, next) => {
    const { name } = req.body;
    if (name) req.body.slug = slugify(name);

    if (req.file) req.body.img = req.file.filename;
    const category = await categoryModel.findOneAndUpdate(
        { _id: req.params.category },
        { ...req.body },
        { new: true }
    );
    if (!category)
        return next(new AppError("Cant not find category with this id", 400));
    res.status(202).json({ msg: "Category updated successfully", category });
});

// @desc      delete specidic category
// @method     DELETE
// @route     /api/v1/categories/:category
// @access    admin
const deleteCategory = findByIdAndDelete(
    categoryModel,
    "category",
    "category"
);

export {
    addCategorey,
    getAllCategories,
    getSpecificCategory,
    updateCategory,
    deleteCategory,
};
