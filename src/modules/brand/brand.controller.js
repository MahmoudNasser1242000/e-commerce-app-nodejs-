import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import brandModel from "../../../database/models/brand.model.js";
import AppError from "../../../utils/errorClass.js";

const addBrand = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const brand = await brandModel.insertMany(req.body);
    res.status(201).json({msg: "Brand added successfully", brand});
})

const getAllBrands = errorAsyncHandler(async (req, res, next) => {
    const brands = await brandModel.find({});
    res.status(200).json({brands});
})

const getSpecificBrand = errorAsyncHandler(async (req, res, next) => {
    const brand = await brandModel.findById(req.params.brandId);
    if (!brand) 
        return next(new AppError("Cant not find brand with this id", 400))
    res.status(200).json({brand});
})

const updateBrand = errorAsyncHandler(async (req, res, next) => {
    const {brandId} = req.params;
    const {name} = req.body;
    if (name) 
        req.body.slug = slugify(name)

    const brand = await brandModel.findByIdAndUpdate({_id: brandId}, {...req.body}, {new: true});
    if (!brand) 
        return next(new AppError("Cant not find brand with this id", 400))
    res.status(202).json({msg: "Brand updated successfully", brand});
})

const deleteBrand = errorAsyncHandler(async (req, res, next) => {
    const {brandId} = req.params;
    const brand = await brandModel.findByIdAndDelete({_id: brandId});
    if (!brand) 
        return next(new AppError("Cant not find brand with this id", 400))
    res.status(202).json({msg: "Brand deleted successfully", brand});
})

export {
    addBrand,
    getAllBrands,
    getSpecificBrand,
    updateBrand,
    deleteBrand
}