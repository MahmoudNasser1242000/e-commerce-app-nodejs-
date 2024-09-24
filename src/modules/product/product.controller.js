import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import productModel from "../../../database/models/product.model.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";

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
    const params = ["brand", "category", "subCategory"];
    params.forEach((param) => {
        if (req.params[param]) {
            filterObj[param] = req.params[param]
        }
    })

    const apiFeatures = new ApiFeatures(productModel.find(filterObj), req.query)
        .pagination()
        .filter()
        .sort()
        .search()
        .fields();
    const products = await apiFeatures.mongooseQuery;
    res
        .status(200)
        .json({ length: products.length, page: apiFeatures.page, products });
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
