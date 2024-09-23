import brandModel from "../../database/models/brand.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

const checkBrandId = errorAsyncHandler(async (req, res, next) => {
    const brand = await brandModel.findById(req.body.brandId || req.params.brandId);

    if (!brand) 
        return res.status(400).json({msg: "Can not find brand with this id"});
    next()
})

export default checkBrandId