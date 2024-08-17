import slugify from "slugify";
import categoryModel from "../../../database/models/category.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addCategorey = errorAsyncHandler(async (req, res, next) => {
    console.log(req.body);
    req.body.slug = slugify(req.body.name)
    const category = await categoryModel.insertMany(req.body);
    res.status(201).json({msg: "Category added successfully", category});
})

export {
    addCategorey
}