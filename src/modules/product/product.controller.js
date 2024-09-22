import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import productModel from "../../../database/models/product.model.js";
import AppError from "../../../utils/errorClass.js";

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
    const products = await productModel.find({});
    res.status(200).json({products});
})

const getSpecificProduct = errorAsyncHandler(async (req, res, next) => {
    const product = await productModel.findById(req.params.productId);
    if (!product) 
        return next(new AppError("Cant not find product with this id", 400))
    res.status(200).json({product});
})

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

const deleteProduct = errorAsyncHandler(async (req, res, next) => {
    const {productId} = req.params;
    const product = await productModel.findByIdAndDelete({_id: productId});
    if (!product) 
        return next(new AppError("Cant not find product with this id", 400))
    res.status(202).json({msg: "Product deleted successfully", product});
})

export {
    addProduct,
    getAllProducts,
    getSpecificProduct,
    updateProduct,
    deleteProduct
};
