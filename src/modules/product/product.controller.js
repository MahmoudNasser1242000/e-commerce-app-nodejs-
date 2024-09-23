import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import productModel from "../../../database/models/product.model.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";

const addProduct = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.title);
    if (req.files)
        req.body.imgCover = req.files.imgCover[0].filename
        req.body.images = req.files.images.map((img) => img.filename)

    const addProduct = new productModel(req.body);
    const product = await addProduct.save()
    res.status(201).json({ msg: "Product added successfully", product });
});

const getAllProducts = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {}
    const {brandId, categoryId, subCategotyId} = req.params
    if (brandId) {
        filterObj.brand = brandId
    }
    if (categoryId) {
        filterObj.category = categoryId
    }
    if (subCategotyId) {
        filterObj.subCategoty = subCategotyId
    }
    const products = await productModel.find(filterObj);
    res.status(200).json({products});
})

const getSpecificProduct = findById(productModel, "productId", "product")

const updateProduct = errorAsyncHandler(async (req, res, next) => {
    const {productId} = req.params;
    const {title} = req.body;
    if (title) 
        req.body.slug = slugify(title)

    if (req.files.imgCover)
        req.body.imgCover = req.files.imgCover[0].filename
    if (req.files.images)
        req.body.images = req.files.images.map((img) => img.filename)
        
    const product = await productModel.findByIdAndUpdate({_id: productId}, {...req.body}, {new: true});
    if (!product) 
        return next(new AppError("Cant not find product with this id", 400))
    res.status(202).json({msg: "Product updated successfully", product});
})

const deleteProduct = findByIdAndDelete(productModel, "productId", "product")

export {
    addProduct,
    getAllProducts,
    getSpecificProduct,
    updateProduct,
    deleteProduct
};
