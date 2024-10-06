import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import subCategoryModel from "../../../database/models/subCategory.model.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";

// @desc      add subCategory
// @method     POST
// @route     /api/v1/subCtegories/
// @access    admin
const addSubCategorey = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    req.body.createdBy = req.user._id;
    const addSubCategorey = new subCategoryModel(req.body)
    const subCategory = await addSubCategorey.save();
    res.status(201).json({ msg: "SubCategory added successfully", subCategory });
});

// @desc      get all subCategories
// @method     GET
// @route     /api/v1/subCtegories/
// @access    public
const getAllSubCategories = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {}
    if (req.params.category) 
        filterObj.category = req.params.category;

    if (req.params.createdBy) 
        filterObj.createdBy = req.params.createdBy;

    const collectionLength = (await subCategoryModel.find(filterObj)).length
    const apiFeatures = new ApiFeatures(subCategoryModel.find(filterObj), req.query)
        .pagination(collectionLength)
        .filter()
        .sort()
        .search()
        .fields();
    const subCategorys = await apiFeatures.mongooseQuery;
    res
        .status(200)
        .json({ length: subCategorys.length, metadata: apiFeatures.metadata, page: apiFeatures.page, subCategorys });
});

// @desc      get specific subCategory
// @method     GET
// @route     /api/v1/subCtegories/:subCategory
// @access    public
const getSpecificSubCategory = findById(
    subCategoryModel,
    "subCategory",
    "subCategory"
);

// @desc      update specific subCategory
// @method     PATCH
// @route     /api/v1/subCtegories/:subCategory
// @access    admin
const updateSubCategory = errorAsyncHandler(async (req, res, next) => {
    const { name } = req.body;
    if (name) req.body.slug = slugify(name);

    const subCategory = await subCategoryModel.findOneAndUpdate(
        { _id: req.params.subCategory },
        { ...req.body },
        { new: true }
    );
    if (!subCategory)
        return next(new AppError("Cant not find subCategory with this id", 400));
    res
        .status(202)
        .json({ msg: "SubCategory updated successfully", subCategory });
});

// @desc      delete specific subCategory
// @method     DELETE
// @route     /api/v1/subCtegories/:subCategory
// @access    admin
const deleteSubCategory = findByIdAndDelete(
    subCategoryModel,
    "subCategory",
    "subCategory"
);

export {
    addSubCategorey,
    getAllSubCategories,
    getSpecificSubCategory,
    updateSubCategory,
    deleteSubCategory,
};
