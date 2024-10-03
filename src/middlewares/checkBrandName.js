import brandModel from "../../database/models/brand.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkBrandName = errorAsyncHandler(async (req, res, next) => {
    const brand = await brandModel.findOne({name: req.body.name});

    if (brand) 
        return next(new AppError("Brand allready exist", 400))
    next()
})

export default checkBrandName