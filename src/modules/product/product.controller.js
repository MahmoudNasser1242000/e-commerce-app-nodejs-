import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import productModel from "../../../database/models/product.model.js";

const addProduct = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.title);
    const product = await productModel.insertMany({
        ...req.body,
    });
    res.status(201).json({ msg: "Product added successfully", product });
});

export {
    addProduct,
};
