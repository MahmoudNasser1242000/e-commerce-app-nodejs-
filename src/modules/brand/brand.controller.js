import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import brandModel from "../../../database/models/brand.model.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";

// @desc      add brand
// @method     POST
// @route     /api/v1/brands/
// @access    admin
const addBrand = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    if (req.file) req.body.logo = req.file.filename;
    req.body.createdBy = req.user._id;
    const addBrand = new brandModel({ ...req.body });
    const brand = await addBrand.save();
    res.status(201).json({ msg: "Brand added successfully", brand });
});

// @desc      get all brands
// @method     GET
// @route     /api/v1/brands/
// @access    public
const getAllBrands = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {};
    if (req.params.createdBy) {
        filterObj.createdBy = req.params.createdBy
    }

    const collectionLength = (await brandModel.find(filterObj)).length

    const apiFeatures = new ApiFeatures(brandModel.find(filterObj), req.query)
        .pagination(collectionLength)
        .filter()
        .sort()
        .search()
        .fields();
    const brands = await apiFeatures.mongooseQuery;
    res
        .status(200)
        .json({ length: brands.length, metadata: apiFeatures.metadata, brands });
});

// @desc      get specific brand
// @method     GET
// @route     /api/v1/brands/:brand
// @access    public

const getSpecificBrand = findById(brandModel, "brand", "brand");

// @desc      update specific brand
// @method     PATCH
// @route     /api/v1/brands/:brand
// @access    admin
const updateBrand = errorAsyncHandler(async (req, res, next) => {
    const { name } = req.body;
    if (name) req.body.slug = slugify(name);

    if (req.file) req.body.logo = req.file.filename;
    const brand = await brandModel.findOneAndUpdate(
        { _id: req.params.brand },
        { ...req.body },
        { new: true }
    );
    if (!brand)
        return next(new AppError("Cant not find brand with this id", 400));
    res.status(202).json({ msg: "Brand updated successfully", brand });
});

// @desc      delete specific brand
// @method     DELETE
// @route     /api/v1/brands/:brand
// @access    admin
const deleteBrand = findByIdAndDelete(brandModel, "brand", "brand");

export { addBrand, getAllBrands, getSpecificBrand, updateBrand, deleteBrand };
