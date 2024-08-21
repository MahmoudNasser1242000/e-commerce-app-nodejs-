import categoryModel from "../../database/models/category.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

const checkCategoryId = errorAsyncHandler(async (req, res, next) => {
    const {categoryId} = req.body
    const category = await categoryModel.findById(categoryId);

    if (!category) 
        return res.status(400).json({msg: "Can not find category with this id"});
    next()
})

export default checkCategoryId