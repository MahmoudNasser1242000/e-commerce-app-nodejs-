import categoryModel from "../../database/models/category.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkCategoryName = errorAsyncHandler(async (req, res, next) => {
    const category = await categoryModel.findOne({name: req.body.name});

    if (category) 
        return next(new AppError("Category allready exist", 400))
    next()
})

export default checkCategoryName