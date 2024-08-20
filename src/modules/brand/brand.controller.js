import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import brandModel from "../../../database/models/brand.model.js";

const addBrand = errorAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const brand = await brandModel.insertMany(req.body);
    res.status(201).json({msg: "Brand added successfully", brand});
})

export {
    addBrand,
}