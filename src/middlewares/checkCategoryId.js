import categoryModel from "../../database/models/category.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

const checkCategoryId = errorAsyncHandler(async (req, res, next) => {
    const category = await categoryModel.findById(req.body.category || req.params.category);

    if (!category) 
        return next(new AppError("Can not find category with this id", 400));
    next()
})

export default checkCategoryId