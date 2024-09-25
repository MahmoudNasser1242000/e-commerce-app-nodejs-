import brandModel from "../../database/models/brand.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkBrandId = errorAsyncHandler(async (req, res, next) => {
    const brand = await brandModel.findById(req.body.brand || req.params.brand);

    if (!brand) 
        return next(new AppError("Can not find brand with this id", 400))
    next()
})

export default checkBrandId