import brandModel from "../../database/models/brand.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

const checkBrandId = errorAsyncHandler(async (req, res, next) => {
    const {brandId} = req.body
    const brand = await brandModel.findById(brandId);

    if (brandId && !brand) 
        return res.status(400).json({msg: "Can not find brand with this id"});
    next()
})

export default checkBrandId