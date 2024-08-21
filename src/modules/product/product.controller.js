import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import productModel from "../../../database/models/product.model.js";
import AppError from "../../../utils/errorClass.js";

const addProduct = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.title);
    const product = await productModel.insertMany({
        ...req.body,
    });
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

export {
    addProduct,
    getAllProducts,
    getSpecificProduct
};
