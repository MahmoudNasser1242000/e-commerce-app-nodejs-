import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import productModel from "../../../database/models/product.model.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";

// @desc      add product
// @method    POST
// @route     /api/v1/products/
// @access    admin
const addProduct = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.title);
    if (req.files)
        req.body.imgCover = req.files.imgCover[0].filename
        req.body.images = req.files.images.map((img) => img.filename)

    req.body.createdBy = req.user._id;
    const addProduct = new productModel(req.body);
    const product = await addProduct.save()
    res.status(201).json({ msg: "Product added successfully", product });
});

// @desc      get all products
// @method    GET
// @route     /api/v1/products/
// @access    public
const getAllProducts = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {}
    const params = ["brand", "category", "subCategory", "createdBy"];
    params.forEach((param) => {
        if (req.params[param]) {
            filterObj[param] = req.params[param]
        }
    })
    
    const collectionLength = (await productModel.find(filterObj)).length
    const apiFeatures = new ApiFeatures(productModel.find(filterObj), req.query)
        .pagination(collectionLength)
        .filter()
        .sort()
        .search()
        .fields();
    const products = await apiFeatures.mongooseQuery;
    res
        .status(200)
        .json({ length: products.length, metadata: apiFeatures.metadata, page: apiFeatures.page, products });
})

// @desc      get specific product
// @method    GET
// @route     /api/v1/products/:product
// @access    public
const getSpecificProduct = findById(productModel, "product", "product")

// @desc      update specific product
// @method    PATCH
// @route     /api/v1/products/:product
// @access    admin
const updateProduct = errorAsyncHandler(async (req, res, next) => {
    const {title} = req.body;
    if (title) 
        req.body.slug = slugify(title)

    if (req.files.imgCover)
        req.body.imgCover = req.files.imgCover[0].filename
    if (req.files.images)
        req.body.images = req.files.images.map((img) => img.filename)
        
    const product = await productModel.findOneAndUpdate({_id: req.params.product}, {...req.body}, {new: true});
    if (!product) 
        return next(new AppError("Cant not find product with this id", 400))
    res.status(202).json({msg: "Product updated successfully", product});
})

// @desc      delete specific product
// @method    DELETE
// @route     /api/v1/products/:product
// @access    admin
const deleteProduct = findByIdAndDelete(productModel, "product", "product")

export {
    addProduct,
    getAllProducts,
    getSpecificProduct,
    updateProduct,
    deleteProduct
};
