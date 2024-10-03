import categoryModel from "../../database/models/category.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkCategoryId = errorAsyncHandler(async (req, res, next) => {
    if (req.body.category || req.params.category) {
        const category = await categoryModel.findOne({ _id: req.body.category || req.params.category });

        if (!category)
            return next(new AppError("Can not find category with this id", 400));
        next()
    } else {
        next()
    }
})

export default checkCategoryId