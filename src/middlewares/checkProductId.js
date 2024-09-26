import productModel from "../../database/models/product.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkProductId = errorAsyncHandler(async (req, res, next) => {
    const product = await productModel.findById(req.body.product || req.params.product);

    if (!product) 
        return next(new AppError("Can not find product with this id", 400));
    next()
})

export default checkProductId