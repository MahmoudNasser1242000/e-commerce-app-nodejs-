import brandModel from "../../database/models/brand.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkBrandId = errorAsyncHandler(async (req, res, next) => {
    if (req.body.brand || req.params.brand) {
        const brand = await brandModel.findOne({ _id: req.body.brand || req.params.brand });

        if (!brand)
            return next(new AppError("Can not find brand with this id", 400))
        next()
    } else {
        next()
    }
})

export default checkBrandId