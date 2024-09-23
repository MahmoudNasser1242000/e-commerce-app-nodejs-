import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import brandModel from "../../../database/models/brand.model.js";
import AppError from "../../../utils/errorClass.js";
import { findById } from "../../../services/apiHandler.js";

const addBrand = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    if (req.file)
        req.body.logo = req.file.filename
    const addBrand = new brandModel({...req.body})
    const brand = await addBrand.save();
    res.status(201).json({msg: "Brand added successfully", brand});
})

const getAllBrands = errorAsyncHandler(async (req, res, next) => {
    const brands = await brandModel.find({});
    res.status(200).json({brands});
})

const getSpecificBrand = findById(brandModel, "brandId", "brand")

const updateBrand = errorAsyncHandler(async (req, res, next) => {
    const {brandId} = req.params;
    const {name} = req.body;
    if (name) 
        req.body.slug = slugify(name)

    if (req.file)
        req.body.logo = req.file.filename
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